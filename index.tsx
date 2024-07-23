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
  const stepAngle = 1; // Шаг наклона в градусах
  const segmentLength = 64; // Длина одного участка дороги
  let currentY = 0; // Начальная высота

  for (let i = 0; i < numBlocks; i++) {
    const angle = i * stepAngle; // Текущий угол поворота
    const x = 0; // Смещение вдоль оси X остается неизменным
    const z = i * segmentLength; // Смещение вдоль оси Z
    currentY = i * segmentLength * Math.sin((stepAngle / 180) * Math.PI); // Увеличиваем высоту на каждом шаге

    blocks.push(
      <Prefab id="race_track_straight_01" x={x} z={z} y={currentY} rotZ={angle} />
    );
  }




  return (
  <HNode scale={0.25}>
	
	<HNode>
		{blocks}
	</HNode>
    <Sign
      header="This map is for sale!"
	  body="For just the price of a cup of coffee ($5). Please send me a private." 
	  x={ 107 } z={ 200 } y={ 6 } rotX={-180}
    />
	<Spawnpoint x={ 107 } z={ 202 } y={ 8 } rotX={0}/>
  </HNode>
  );
};

render(<World />, { environment: 'midday_clear_01' });
