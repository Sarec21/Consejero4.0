import plotPhasesData from '../data/plot_phases.json'

export interface PlotPhase {
  id: string
  plotId: string
  phaseType: 'hint' | 'conflict' | 'climax'
  title: string
  summary: string
  mood: string
  visual: { tag_ia: string }
  tags: string[]
  forcedAdvanceAfter: number
}

const plotPhases = plotPhasesData as unknown as PlotPhase[]

export function getPhasesForPlot(plotId: string): PlotPhase[] {
  return plotPhases.filter((phase) => phase.plotId === plotId)
}

export function getPhaseByType(
  plotId: string,
  phaseType: 'hint' | 'conflict' | 'climax',
): PlotPhase | undefined {
  return plotPhases.find(
    (phase) => phase.plotId === plotId && phase.phaseType === phaseType,
  )
}
