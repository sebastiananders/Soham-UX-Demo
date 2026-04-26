import speakerIcon from '../assets/speaker.svg';
import warmContactsIcon from '../assets/warmcontacts.svg';
import regInsightIcon from '../assets/reginsight.svg';
import type { AgentId } from '../../types';

const AVATAR_ICON: Record<AgentId, string> = {
  website:  speakerIcon,
  contacts: warmContactsIcon,
  insights: regInsightIcon,
};

export function AgentAvatar({ agentId, size = 20 }: { agentId: AgentId; size?: number }) {
  const icon = AVATAR_ICON[agentId];
  const s = size;
  return (
    <img src={icon} alt={agentId} style={{ width: s, height: s, flexShrink: 0 }} />
  );
}
