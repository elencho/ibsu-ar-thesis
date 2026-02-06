import {
	Viro3DObject,
	ViroAmbientLight,
	ViroARPlane,
	ViroARScene,
	ViroARSceneNavigator,
	ViroClickStateTypes,
	ViroDirectionalLight,
	ViroMaterials,
	ViroQuad,
} from "@reactvision/react-viro";
import { Viro3DPoint } from "@reactvision/react-viro/dist/components/Types/ViroUtils";
import React, { useState } from "react";

ViroMaterials.createMaterials({
	QuadMaterial: {
		lightingModel: "Constant",
		diffuseColor: "#888",
	},
	FurnitureMaterial: {
		lightingModel: "Lambert",
		diffuseColor: "#8B6F47", // Brown/tan color for furniture
	},
});


function Scene({ modelUrl }: { modelUrl: string }) {
	const [position, setPosition] = useState<Viro3DPoint | null>(null);

	return (
		<ViroARScene>
			<ViroAmbientLight color="#FFFFFF" intensity={400} />
			<ViroDirectionalLight
				direction={[0, -1, -0.5]}
				color="#FFFFFF"
				intensity={1000}
				castsShadow={false}
			/>
			<ViroARPlane dragType="FixedToWorld">
				<Viro3DObject
					visible={!!position}
					source={require('../../assets/images/Koltuk.obj')}
					position={position ?? [0, 0, 0]}
					scale={[1, 1, 1]}
					type="OBJ"
					dragType="FixedToWorld"
					onDrag={() => {}}
				/>
				<ViroQuad
					visible={!position}
					position={[0, 0, 0]}
					width={1}
					height={1}
					rotation={[-90, 0, 0]}
					materials="QuadMaterial"
					onClickState={(state, position) => {
						if (state === ViroClickStateTypes.CLICKED) {
							setPosition(position);
						}
					}}
				/>
			</ViroARPlane>
		</ViroARScene>
	);
}


export default function TabTwoScreen() {
	const modelUrl = "https://reactvision.com/assets/viro-examples/assets/tree/tree.glb";
  return (
    <ViroARSceneNavigator
				initialScene={{ scene: () => <Scene modelUrl={modelUrl} /> }}
			/>
  );
}
