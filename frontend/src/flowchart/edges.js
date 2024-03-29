import { MarkerType } from 'reactflow';

export default [
  {
   id:'e1-2',
    source: '0',
    target: '1',
    label: 'hello',
    className: 'normal-edge',
  },
  {
    id: 'ew2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    label: 'smoothstep edge',
  },
  {
    id: 'edges-e2-3',
    source: '2',
    target: '3',
    type: 'step',
    label: 'step edge',
  },
  {
    id: 'edges-e3-4',
    source: '2',
    target: '4',
    animated: true,
    label: 'animated styled edge',
    style: { stroke: 'red' },
  },
  {
    id: 'edges-e3-3a',
    source: 'edges-3',
    target: 'edges-3a',
    type: 'straight',
    label: 'label only edge',
    // style: { stroke: 'none' },
  },
  {
    id: 'edges-e3-5',
    source: 'edges-4',
    target: 'edges-5',
    animated: true,
    label: 'animated styled edge',
    style: { stroke: 'red' },
  },
  {
    id: 'edges-e5-6',
    source: 'edges-5',
    target: 'edges-6',
    label: 'styled label',
    labelStyle: { fill: 'red', fontWeight: 700 },
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    id: 'edges-e5-7',
    source: 'edges-5',
    target: 'edges-7',
    label: 'label with styled bg',
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];
