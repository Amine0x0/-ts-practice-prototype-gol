import { useEffect, useRef } from 'react'

interface ConwayBackgroundProps {
  cellSize?: number
  speedMs?: number
  cellColor?: string
  spawnEvery?: number
}

const GLIDER = [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]]
const R_PENTOMINO = [[0, 1], [0, 2], [1, 0], [1, 1], [2, 1]]

export function GameOfLife({
  cellSize = 14,
  speedMs = 200,
  cellColor = '#000000',
  spawnEvery = 6,
}: ConwayBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let timeoutId: number | undefined

    let cols = 0
    let rows = 0
    let grid = new Uint8Array()
    let nextGrid = new Uint8Array()
    let generation = 0

    ctx.imageSmoothingEnabled = false

    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = width
      canvas.height = height

      cols = Math.ceil(width / cellSize)
      rows = Math.ceil(height / cellSize)

      grid = new Uint8Array(cols * rows)
      nextGrid = new Uint8Array(cols * rows)

      for (let index = 0; index < grid.length; index++) {
        grid[index] = Math.random() < 0.14 ? 1 : 0
      }
    }

    resize()
    window.addEventListener('resize', resize)

    const countNeighbors = (r: number, c: number) => {
      let count = 0
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue
          const nr = (r + i + rows) % rows
          const nc = (c + j + cols) % cols
          count += grid[nr * cols + nc]
        }
      }
      return count
    }
    const stamp = (
      cells: number[][],
      r0: number,
      c0: number,
      fr: number,
      fc: number,
    ) => {
      for (const [dr, dc] of cells) {
        const r = (r0 + dr * fr + rows) % rows
        const c = (c0 + dc * fc + cols) % cols
        grid[r * cols + c] = 1
      }
    }

    const inject = () => {
      const pattern = Math.random() < 0.25 ? R_PENTOMINO : GLIDER
      stamp(
        pattern,
        Math.floor(Math.random() * rows),
        Math.floor(Math.random() * cols),
        Math.random() < 0.5 ? 1 : -1,
        Math.random() < 0.5 ? 1 : -1,
      )
    }

    const nextGeneration = () => {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const index = r * cols + c
          const neighbors = countNeighbors(r, c)
          nextGrid[index] =
            neighbors === 3 || (grid[index] === 1 && neighbors === 2) ? 1 : 0
        }
      }
      ;[grid, nextGrid] = [nextGrid, grid]
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = cellColor
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (grid[r * cols + c] === 1) {
            ctx.fillRect(c * cellSize, r * cellSize, cellSize - 2, cellSize - 2)
          }
        }
      }
    }

    const loop = () => {
      nextGeneration()
      if (++generation % spawnEvery === 0) inject()
      draw()
      timeoutId = window.setTimeout(loop, speedMs)
    }

    draw()
    timeoutId = window.setTimeout(loop, speedMs)

    return () => {
      window.removeEventListener('resize', resize)
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
    }
  }, [cellColor, cellSize, speedMs, spawnEvery])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 h-full w-full opacity-80"
      style={{ imageRendering: 'pixelated' }}
    />
  )
}