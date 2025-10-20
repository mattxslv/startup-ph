import { useTab } from './context';

type Props = {
  id: string
  children?: any | null
}

function TabPanel({ id, children }: Props) {
  const { tab } = useTab();
  if (tab !== id) return null
  return children;
}

export default TabPanel