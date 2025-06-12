import { ReactFlow, Controls, Background, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { Edge, NodeProps } from '@xyflow/react';

interface SkillData {
    label: string; // Nombre de la habilidad
    img: string; // URL de la imagen del logo
    level: number; // Nivel de habilidad (opcional)
    group: string; // Agrupación de la habilidad (opcional)
}

export default function TechGraph({ techs }: { techs: SkillData[] }) {
    const groupedTechs = techs.reduce<Record<string, SkillData[]>>((acc, tech) => {
        acc[tech.group] = acc[tech.group] || [];
        acc[tech.group].push(tech);
        return acc;
    }, {});

    const baseY = 14;
    const spacingY = 140;
    const spacingX = 210;

    const groupNames = Object.keys(groupedTechs);

    const nodeStyle = 'bg-white text-center border border-gray-300 rounded-xl p-2 w-[150px]';
    const nodeTitleStyle = 'bg-[#4A2FBD] text-center border border-gray-300 rounded-xl p-2 w-[150px] h-[80px] text-sm font-semibold';

    const CustomTitleNode = ({ data }) => (
        <div className={nodeTitleStyle}>
            {/* Entrada */}
            <Handle type="target" position={Position.Left} style={{ background: '#555' }} />

            <p className='font-black text-base'>{data.label}</p>

            {/* Salida */}
            <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
        </div>
    );

    const CustomNode = ({ data } : SkillData) => (
        <div className={nodeStyle}>
            {/* Entrada */}
            <Handle type="target" position={Position.Left} style={{ background: '#555' }} />

            <img src={data.img} alt={`Logo de ${data.label}`} width={40} height={40} className='object-contain' />
            <div className="text-sm font-bold text-black">{data.label}</div>
            <meter
                value={data.level}
                min={0}
                max={100}
                low={30}
                high={80}
                optimum={100}
                className="w-full h-2 mt-2"
                title={`Nivel de habilidad en ${data.label}`}
                aria-label={`Habilidad en ${data.label}`}
            />

            {/* Salida */}
            <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
        </div>
    );

    // Crear nodos
    const nodes = [
        {
            id: 'root',
            type: 'title',
            data: { label: 'Skill' },
            position: { x: 0, y: (groupNames.length - 0.70) * spacingY / 2 },
        },// Frontend, Backend, Base de Datos...
        ...groupNames.map((group, groupIndex) => ({
            id: `group-${group}`,
            type: 'title',
            data: { label: group },
            position: {
                x: 210,
                y: baseY + groupIndex * spacingY,
            },
        })),// Tecnologias dentro de cada grupo
        ...groupNames.flatMap((group, groupIndex) =>
            groupedTechs[group].map((tech, techIndex) => ({
                id: `tech-${group}-${techIndex}`,
                type: 'custom',
                data: tech,
                position: {
                    x: spacingX * (techIndex + 2),
                    y: groupIndex * spacingY,
                },
            }))
        ),
    ];
    // Crear aristas, conectando el nodo raíz a cada grupo
    const edges: Edge[] = [
        ...groupNames.map(group => ({
            id: `edge-root-${group}`,
            source: 'root',
            target: `group-${group}`,
            type: 'smoothstep',
            animated: true,
        })),// Conectar cada grupo con sus tecnologías
        ...groupNames.flatMap((group, groupIndex) =>
            groupedTechs[group].map((_, techIndex) => ({
                id: `edge-${group}-${techIndex}`,
                source: techIndex === 0 ? `group-${group}` : `tech-${group}-${techIndex - 1}`,
                target: `tech-${group}-${techIndex}`,
                type: 'smoothstep',
                animated: true,
            }))
        ),
    ];

    return (
        <div className="w-full h-[600px] md:h-[100vh] overflow-x-auto">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={{ custom: CustomNode, title: CustomTitleNode }}
                fitView

                nodesDraggable={false}
                zoomOnScroll={false}
                panOnDrag={false}
                elementsSelectable={false}
            >
                {/* <Background /> */}
                {/* <Controls /> */}
            </ReactFlow>
        </div>
    );
}