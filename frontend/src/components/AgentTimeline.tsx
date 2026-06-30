import React from 'react';
import { TimelineStep } from '../types';

interface AgentTimelineProps {
  steps: TimelineStep[];
}

export default function AgentTimeline({ steps }: AgentTimelineProps) {
  if (steps.length === 0) return null;

  return (
    <div className="agent-progress-box">
      <div className="agent-title">
        <div className="agent-status-indicator"></div>
        <span>LangChain Graph Execution Log</span>
      </div>
      <div className="agent-timeline">
        {steps.map(step => (
          <div key={step.id} className={`timeline-step ${step.status}`}>
            <div className="timeline-step-label">
              <span>{step.label}</span>
              {step.time && <span className="timeline-step-time">TIMESTAMP: {step.time}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
