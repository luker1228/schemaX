import { StatusClickDrill, InputMirrorDrill, TaskAddDrill, TaskDeleteDrill } from './JsDrillDemos';
interface Props { drill: 'status' | 'input' | 'add' | 'delete' }
export default function JsDrillDemoIsland({ drill }: Props) { const Drill = drill === 'status' ? StatusClickDrill : drill === 'input' ? InputMirrorDrill : drill === 'add' ? TaskAddDrill : TaskDeleteDrill; return <Drill />; }
