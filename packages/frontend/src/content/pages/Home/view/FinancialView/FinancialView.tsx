import React from 'react'

import { PercentChange } from '../../../../common'
import { StarkWareIcon, WarningIcon } from '../../../../common/icons'
import { ProjectLink } from '../ProjectLink'
import { Column, TableView } from '../TableView'
import { FinancialCell } from './FinancialCell'
import { TVLCell } from './TVLCell'

export interface FinancialViewProps {
  items: FinancialViewEntry[]
}

export interface FinancialViewEntry {
  name: string
  slug: string
  isStarkEx: boolean
  tvl: string
  tvlWarning?: string
  warningSeverity: 'info' | 'warning' | 'bad'
  oneDayChange: string
  sevenDayChange: string
  marketShare: string
  purpose: string
  technology: {
    abbreviation: string
    name: string
  }
}

export function FinancialView({ items }: FinancialViewProps) {
  const columns: Column<FinancialViewEntry>[] = [
    {
      name: 'Name',
      getValue: (project) => <ProjectLink project={project} />,
    },
    {
      name: 'Value Locked',
      shortName: 'TVL',
      alignRight: true,
      getValue: (project) => <TVLCell project={project} />,
    },
    {
      name: '7 days change',
      shortName: '% / 7 days',
      alignRight: true,
      getValue: (project) => <PercentChange value={project.sevenDayChange} />,
    },
    {
      name: 'Market share',
      alignRight: true,
      getValue: (project) => project.marketShare,
    },
    {
      name: 'Purpose',
      alignRight: true,
      getValue: (project) => <FinancialCell>{project.purpose}</FinancialCell>,
    },
    {
      name: 'Technology',
      shortName: 'Tech',
      alignRight: true,
      getValue: (project) => (
        <FinancialCell
          className={
            project.technology.name === 'ZK Rollup' ||
            project.technology.name === 'Optimistic Rollup'
              ? 'rollup'
              : undefined
          }
        >
          {project.technology.name}
        </FinancialCell>
      ),
    },
  ]

  return (
    <div className="FinancialView active">
      <TableView items={items} columns={columns} />
      <div className="FinancialView-Symbols">
        <p>
          <WarningIcon fill="var(--text-warning)" />
          <span>&ndash;</span>
          <span>
            A token associated with the project accounts for more than 10% of
            the TVL.
          </span>
        </p>
        <p>
          <WarningIcon fill="var(--text-bad)" />
          <span>&ndash;</span>
          <span>
            A token associated with the project accounts for more than 90% of
            the TVL. This may make the metric vulnerable to manipulation if the
            majority of the supply is concentrated and markets are very
            illiquid.
          </span>
        </p>
        <p>
          <StarkWareIcon />
          <span>&ndash;</span>
          <span>This project is built using StarkEx.</span>
        </p>
      </div>
    </div>
  )
}
