'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface SettingsContextType {
  colorScheme: 'default' | 'blue' | 'grayscale'
  setColorScheme: (colorScheme: 'default' | 'blue' | 'grayscale') => void
  units: 'metric' | 'imperial'
  setUnits: (units: 'metric' | 'imperial') => void
  moistureUnit: 'percentage' | 'volumetric'
  setMoistureUnit: (moistureUnit: 'percentage' | 'volumetric') => void
  displayValuesInCells: boolean
  setDisplayValuesInCells: (displayValuesInCells: boolean) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<'default' | 'blue' | 'grayscale'>('default')
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric')
  const [moistureUnit, setMoistureUnit] = useState<'percentage' | 'volumetric'>('percentage')
  const [displayValuesInCells, setDisplayValuesInCells] = useState(false)

  useEffect(() => {
    const storedColorScheme = localStorage.getItem('colorScheme') as 'default' | 'blue' | 'grayscale' | null
    const storedUnits = localStorage.getItem('units') as 'metric' | 'imperial' | null
    const storedMoistureUnit = localStorage.getItem('moistureUnit') as 'percentage' | 'volumetric' | null
    const storedDisplayValuesInCells = localStorage.getItem('displayValuesInCells')

    if (storedColorScheme) setColorScheme(storedColorScheme)
    if (storedUnits) setUnits(storedUnits)
    if (storedMoistureUnit) setMoistureUnit(storedMoistureUnit)
    if (storedDisplayValuesInCells) setDisplayValuesInCells(storedDisplayValuesInCells === 'true')
  }, [])

  useEffect(() => {
    localStorage.setItem('colorScheme', colorScheme)
    localStorage.setItem('units', units)
    localStorage.setItem('moistureUnit', moistureUnit)
    localStorage.setItem('displayValuesInCells', displayValuesInCells.toString())
  }, [colorScheme, units, moistureUnit, displayValuesInCells])

  return (
    <SettingsContext.Provider value={{
      colorScheme,
      setColorScheme,
      units,
      setUnits,
      moistureUnit,
      setMoistureUnit,
      displayValuesInCells,
      setDisplayValuesInCells
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}