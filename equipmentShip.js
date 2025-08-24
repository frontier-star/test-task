import { Vector3, Euler } from "three";
import { config_ships } from "../configs/config_ships.js";
import { config_weapons } from "../configs/config_weapons.js";
import { collectColliders } from "./checkingCollision.js";

export const equipmentShip = (players, resources) => {
  const shots = [];

  const rayAABBIntersect = (rayStart, rayDirection, collider, maxRange) => {
    // Проверяем пересечение луча с AABB по осям X и Z
    const tMinX = (collider.x1 - rayStart[0]) / rayDirection.x;
    const tMaxX = (collider.x2 - rayStart[0]) / rayDirection.x;
    const tMinZ = (collider.z1 - rayStart[2]) / rayDirection.z;
    const tMaxZ = (collider.z2 - rayStart[2]) / rayDirection.z;

    const tMin = Math.max(Math.min(tMinX, tMaxX), Math.min(tMinZ, tMaxZ));
    const tMax = Math.min(Math.max(tMinX, tMaxX), Math.max(tMinZ, tMaxZ));

    // Проверяем попадание в диапазон и дальность
    if (tMax >= 0 && tMin <= tMax && tMin <= maxRange && tMin >= 0) {
      return [
        rayStart[0] + tMin * rayDirection.x,
        rayStart[1] + tMin * rayDirection.y,
        rayStart[2] + tMin * rayDirection.z,
      ];
    } else {
      return null;
    }
  };

  // Функция для расчета направления башни с ограниченным поворотом
  const calculateTurretDirection = (shipPosition, shipRotation, mouseWorldPos, maxTurnAngle = Math.PI / 3) => {
    // Направление корабля (вперед)
    const shipForward = new Vector3(
      Math.sin(shipRotation[1]), 
      0, 
      Math.cos(shipRotation[1])
    );
    
    // Направление к мыши
    const toMouse = new Vector3(
      mouseWorldPos[0] - shipPosition[0],
      0,
      mouseWorldPos[2] - shipPosition[2]
    ).normalize();
    
    // Угол между направлением корабля и мышью
    const angleToMouse = Math.atan2(
      shipForward.x * toMouse.z - shipForward.z * toMouse.x,
      shipForward.x * toMouse.x + shipForward.z * toMouse.z
    );
    
    // Ограничиваем угол поворота башни
    const clampedAngle = Math.max(-maxTurnAngle, Math.min(maxTurnAngle, angleToMouse));
    
    // Финальное направление башни
    const turretAngle = shipRotation[1] + clampedAngle;
    return new Vector3(Math.sin(turretAngle), 0, Math.cos(turretAngle));
  };

  for (const playerID in players) {
    const player = players[playerID];

    if (player.keys.LBM) {
      const raySlot = config_ships.explorer.slots.weapon[0];

      // Создаём смещение как вектор
      const weaponSlotOffset = new Vector3(raySlot.x, raySlot.y, raySlot.z);

      // Применяем эйлеровы углы (поворот корабля)
      const shipRotation = new Euler(
        player.rotation[0],
        player.rotation[1],
        player.rotation[2]
      );
      weaponSlotOffset.applyEuler(shipRotation);

      // Получаем стартовую точку луча
      const rayStartVec = new Vector3(...player.position).add(weaponSlotOffset);
      const rayStart = [rayStartVec.x, rayStartVec.y, rayStartVec.z];

      const maxRange = config_weapons.laser_vector.range;
      // Параметры из Canvas
      const fov = 30; // градусы
      const cameraHeight = 250;
      const aspect = player.mouse.screenWidth / player.mouse.screenHeight;

      // Размер видимой области на уровне игры (y = 0)
      const viewportHeight = 2 * Math.tan((fov * Math.PI / 180) / 2) * cameraHeight;
      const viewportWidth = viewportHeight * aspect;

      // Нормализация координат мыши
      const normalizedX = (player.mouse.x / player.mouse.screenWidth) * 2 - 1;
      const normalizedZ = ((player.mouse.z / player.mouse.screenHeight) * 2 - 1);

      // Мировые координаты мыши
      const mouseWorldX = player.position[0] + normalizedX * viewportWidth * 0.5;
      const mouseWorldZ = player.position[2] - normalizedZ * viewportHeight * 0.5;
      const mouseWorldPos = [mouseWorldX, 0, mouseWorldZ];

      // Рассчитываем направление башни с ограничением
      const turretDirection = calculateTurretDirection(
        player.position, 
        player.rotation, 
        mouseWorldPos,
        Math.PI / 3 // 60 градусов максимальный поворот
      );

      // Конечная точка луча
      const rayEnd = [
        rayStart[0] + turretDirection.x * maxRange,
        rayStart[1] + turretDirection.y * maxRange,
        rayStart[2] + turretDirection.z * maxRange
      ];

      const arrayCollision = collectColliders(players, resources);
      const hitData = {
        playerId: playerID,
        rayStart: rayStart,
        rayEnd: rayEnd,
        turretDirection: [turretDirection.x, turretDirection.y, turretDirection.z] // для анимации башни
      };

      console.log(hitData.rayEnd);

      for (const obj of arrayCollision) {
        // ! Нужно выйти при первом обнаружении попадания
        if (obj.socketId === playerID) {
          continue;
        }

        const hitPoint = rayAABBIntersect(
          rayStart,
          turretDirection,
          obj.collider,
          maxRange
        );

        if (hitPoint) {
          hitData.rayEnd = hitPoint;
          shots.push(hitData);
          break;
        } else {
          shots.push(hitData);
          break;
        }
      }
    }
  }

  return shots;
};