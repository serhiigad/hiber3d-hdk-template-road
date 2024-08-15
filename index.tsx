import { HDKComponent, HNode, Prefab, render, InfoPanel  } from '@hiber3d/hdk-react';
import { Ground, Spawnpoint} from '@hiber3d/hdk-react-components';

const Sign: HDKComponent<{ header: string; body: string; url: string }> = ({ ...props }) => (
  <InfoPanel {...props} openUrlInNewTab>
    <Prefab id="sign_wooden_01_question" rotY={180} />
  </InfoPanel>
);

const World = () => {
  const blocks = [];
  const numBlocks = 360; // Количество блоков для штопора
  const stepAngle = 0.5; // Шаг наклона в градусах
  const segmentLength = 64; // Длина одного участка дороги
  const roadWidth = 125; // Ширина дороги, чтобы учесть высоту краев
  let currentY = 0; // Начальная высота

  for (let i = 0; i < numBlocks; i++) {
    const angle = i * stepAngle; // Текущий угол поворота
    const x = 0; // Смещение вдоль оси X остается неизменным
    const z = i * segmentLength; // Смещение вдоль оси Z

    // Увеличиваем высоту на каждом шаге
    currentY += segmentLength * Math.sin((stepAngle / 180) * Math.PI);

    // Коррекция по высоте с учетом наклона дороги
    const yOffset = (roadWidth / 2) * Math.sin((angle / 180) * Math.PI);

    blocks.push(
      <HNode x={x} z={z} y={currentY - yOffset} rotZ={angle}>
        <Prefab id="race_track_straight_01" 
        />
        <Prefab id="large_pipe_01" 
          y={-15}
          scaleX={1.5}
          scaleZ={2}
          material="t_glass_03" 
        />
        {/* Привязанные элементы gpl_air_boost_01 */}
        <Prefab 
          id="gpl_air_boost_01" 
          z={10}  // Смещение относительно основной дороги
          rotY={180}
          scaleX={4}
          scaleY={2.6} 
          
        />
        <Prefab 
          id="gpl_air_boost_01" 
          z={-10}  // Смещение относительно основной дороги
          rotY={180} 
          scaleX={4}
          scaleY={2.6} 
          
        />
        <Prefab 
          id="gpl_air_boost_01" 
          z={30}  // Смещение относительно основной дороги
          rotY={180} 
          scaleX={4}
          scaleY={2.6}
          
        />
        <Prefab 
          id="gpl_air_boost_01" 
          z={-30}  // Смещение относительно основной дороги
          rotY={180}
          scaleX={4}
          scaleY={2.6}  
          
        />
      </HNode>
      
    );


    // Создание ровной дороги под основной, смещенной по оси Y на -40
    blocks.push(
      <Prefab 
        id="race_track_straight_01" 
        x={x} 
        z={z} 
        y={currentY - yOffset - 40} // Смещение на -40 по Y
      />
    );
  }

  return (
    <HNode>
      <HNode>
        {blocks}
      </HNode>
      <Sign
        header="This map is for sale!"
        body="For just the price of a cup of coffee ($5). Please send me a private." 
        x={107} z={200} y={6} rotX={-180}
      />
      <Spawnpoint x={-10} z={-7} y={3} rotX={1}/>
      <Prefab id="gpl_car_03" x={-10} z={2.6} y={3} />
    </HNode>
  );
};

render(<World />, { environment: 'midday_clear_01' });
