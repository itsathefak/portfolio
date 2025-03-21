"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSound } from "@/components/sound-provider"
import { CheckCircleIcon, RefreshCwIcon, ArrowLeftIcon, ImageIcon } from "lucide-react"
import confetti from "canvas-confetti"
import Image from "next/image"

export default function InteractivePuzzle({ mode }) {
  const [grid, setGrid] = useState([])
  const [completed, setCompleted] = useState(false)
  const [moves, setMoves] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [showInstructions, setShowInstructions] = useState(true)
  const [difficulty, setDifficulty] = useState("medium") // easy, medium, hard
  const [showPreview, setShowPreview] = useState(false)
  const puzzleContainerRef = useRef(null)
  const { playClickSound, playHoverSound } = useSound()

  // Define puzzle images for each mode
  const puzzleImages = {
    tech: {
      title: "Tech Puzzle",
      description: "Rearrange the tiles to complete the image of a futuristic tech interface",
      image: "/images/tech-puzzle.jpg",
      fallbackImage: "/placeholder.svg?height=600&width=600&text=Tech+Puzzle",
      previewText: "Futuristic Tech Interface",
    },
    environmental: {
      title: "Nature Puzzle",
      description: "Rearrange the tiles to complete the beautiful forest landscape",
      image: "/images/nature-puzzle.jpg",
      fallbackImage: "/placeholder.svg?height=600&width=600&text=Nature+Puzzle",
      previewText: "Forest Landscape",
    },
  }

  // Get grid size based on difficulty
  const getGridSize = () => {
    switch (difficulty) {
      case "easy":
        return 3 // 3x3
      case "medium":
        return 4 // 4x4
      case "hard":
        return 5 // 5x5
      default:
        return 4
    }
  }

  // Initialize puzzle
  useEffect(() => {
    resetPuzzle()
  }, [mode, difficulty])

  const resetPuzzle = () => {
    const gridSize = getGridSize()
    const totalTiles = gridSize * gridSize

    // Create ordered grid first
    const orderedGrid = Array.from({ length: totalTiles - 1 }, (_, i) => ({
      id: i + 1,
      currentPos: i,
      correctPos: i,
    }))

    // Add empty tile
    orderedGrid.push({
      id: 0, // 0 represents empty tile
      currentPos: totalTiles - 1,
      correctPos: totalTiles - 1,
    })

    // Shuffle grid (ensuring it's solvable)
    const shuffledGrid = createSolvablePuzzle(orderedGrid, gridSize)

    setGrid(shuffledGrid)
    setCompleted(false)
    setStartTime(Date.now())
    setEndTime(null)
    setMoves(0)
    setShowInstructions(true)
  }

  // Create a solvable puzzle (not all random arrangements are solvable)
  const createSolvablePuzzle = (orderedGrid, gridSize) => {
    // Start with solved puzzle
    const shuffled = [...orderedGrid]

    // Make a series of valid moves to shuffle (this ensures solvability)
    const numMoves = gridSize * gridSize * 5 // More moves for more randomness
    let emptyPos = shuffled.findIndex((tile) => tile.id === 0)

    for (let i = 0; i < numMoves; i++) {
      const possibleMoves = getValidMoves(emptyPos, gridSize)
      if (possibleMoves.length > 0) {
        // Pick a random valid move
        const randomMoveIndex = Math.floor(Math.random() * possibleMoves.length)
        const tileToMove = possibleMoves[randomMoveIndex]

        // Swap with empty tile
        ;[shuffled[emptyPos], shuffled[tileToMove]] = [shuffled[tileToMove], shuffled[emptyPos]]

        // Update positions
        shuffled[emptyPos].currentPos = emptyPos
        shuffled[tileToMove].currentPos = tileToMove

        // Update empty position
        emptyPos = tileToMove
      }
    }

    return shuffled
  }

  // Get valid moves for the empty tile
  const getValidMoves = (emptyPos, gridSize) => {
    const validMoves = []
    const row = Math.floor(emptyPos / gridSize)
    const col = emptyPos % gridSize

    // Check up
    if (row > 0) validMoves.push(emptyPos - gridSize)
    // Check down
    if (row < gridSize - 1) validMoves.push(emptyPos + gridSize)
    // Check left
    if (col > 0) validMoves.push(emptyPos - 1)
    // Check right
    if (col < gridSize - 1) validMoves.push(emptyPos + 1)

    return validMoves
  }

  // Handle tile click
  const handleTileClick = (tileIndex) => {
    if (completed) return

    const gridSize = getGridSize()
    const emptyTileIndex = grid.findIndex((tile) => tile.id === 0)

    // Check if the clicked tile is adjacent to the empty tile
    const validMoves = getValidMoves(emptyTileIndex, gridSize)

    if (validMoves.includes(tileIndex)) {
      playClickSound()

      // Swap tiles
      const newGrid = [...grid]
      ;[newGrid[tileIndex], newGrid[emptyTileIndex]] = [newGrid[emptyTileIndex], newGrid[tileIndex]]

      // Update positions
      newGrid[tileIndex].currentPos = tileIndex
      newGrid[emptyTileIndex].currentPos = emptyTileIndex

      setGrid(newGrid)
      setMoves(moves + 1)

      // Check if puzzle is solved
      const isSolved = newGrid.every((tile) => tile.currentPos === tile.correctPos)
      if (isSolved) {
        setCompleted(true)
        setEndTime(Date.now())

        // Trigger confetti
        if (puzzleContainerRef.current) {
          const rect = puzzleContainerRef.current.getBoundingClientRect()
          const x = (rect.left + rect.right) / 2 / window.innerWidth
          const y = (rect.top + rect.bottom) / 2 / window.innerHeight

          confetti({
            particleCount: 100,
            spread: 70,
            origin: { x, y: y - 0.1 },
          })
        }
      }
    }
  }

  // Format time
  const formatTime = (ms) => {
    if (!ms) return "00:00"
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Calculate time taken
  const timeTaken = endTime ? formatTime(endTime - startTime) : formatTime(Date.now() - (startTime || Date.now()))

  // Get current puzzle data
  const currentPuzzle = puzzleImages[mode]
  const gridSize = getGridSize()

  return (
    <section id="interactive-puzzle" className="py-20 relative">
      {mode === "tech" ? (
        <div className="absolute inset-0 -z-10 " />
      ) : (
        <div className="absolute inset-0 -z-10" />
      )}

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            whileInView={{ scale: [0.9, 1.1, 1] }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold mb-4 inline-block relative">
              Sliding Puzzle Challenge
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </h2>
          </motion.div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">{currentPuzzle.title}</h3>
              <p className="text-gray-300">{currentPuzzle.description}</p>
            </div>

            {/* Puzzle controls */}
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <div className="flex flex-wrap gap-2">
                <div className="bg-white/10 px-3 py-1 rounded-full text-sm">Time: {timeTaken}</div>
                <div className="bg-white/10 px-3 py-1 rounded-full text-sm">Moves: {moves}</div>
              </div>

              <div className="flex flex-wrap gap-2">
                <select
                  value={difficulty}
                  onChange={(e) => {
                    playClickSound()
                    setDifficulty(e.target.value)
                  }}
                  className="bg-white/10 px-3 py-1 rounded-full text-sm cursor-pointer"
                  onMouseEnter={playHoverSound}
                >
                  <option value="easy">Easy (3×3)</option>
                  <option value="medium">Medium (4×4)</option>
                  <option value="hard">Hard (5×5)</option>
                </select>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    playClickSound()
                    setShowPreview(!showPreview)
                  }}
                  onMouseEnter={playHoverSound}
                  className="bg-white/10 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  <ImageIcon size={14} />
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    playClickSound()
                    resetPuzzle()
                  }}
                  onMouseEnter={playHoverSound}
                  className="bg-white/10 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  <RefreshCwIcon size={14} />
                  Reset
                </motion.button>
              </div>
            </div>

            {/* Image preview */}
            <AnimatePresence>
              {showPreview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="bg-black/30 p-4 rounded-lg">
                    <p className="text-sm mb-2 text-center">Complete Image Preview</p>
                    <div className="relative w-full max-w-[300px] h-[300px] mx-auto rounded-lg overflow-hidden">
                      <Image
                        src={currentPuzzle.image || currentPuzzle.fallbackImage}
                        alt={currentPuzzle.previewText}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Instructions overlay */}
            <AnimatePresence>
              {showInstructions && !completed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50"
                  onClick={() => setShowInstructions(false)}
                >
                  <div className="bg-black/80 p-6 rounded-xl max-w-md text-center">
                    <h4 className="text-lg font-bold mb-2">How to Play</h4>
                    <p className="mb-4">
                      Click on tiles adjacent to the empty space to move them. Rearrange all tiles to complete the
                      image!
                    </p>
                    <div className="flex justify-center gap-4 mb-4">
                      <div className="flex flex-col items-center">
                        <div className="bg-white/10 p-2 rounded-lg mb-2">
                          <ArrowLeftIcon size={24} />
                        </div>
                        <span className="text-xs">Click adjacent tiles</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="bg-white/10 p-2 rounded-lg mb-2">
                          <ImageIcon size={24} />
                        </div>
                        <span className="text-xs">Preview image</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="bg-white/10 p-2 rounded-lg mb-2">
                          <RefreshCwIcon size={24} />
                        </div>
                        <span className="text-xs">Reset puzzle</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-primary text-white px-4 py-2 rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation()
                        playClickSound()
                        setShowInstructions(false)
                      }}
                    >
                      Start Puzzle
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Puzzle container */}
            <div
              ref={puzzleContainerRef}
              className="relative mx-auto bg-black/20 rounded-lg p-4 overflow-hidden"
              style={{
                width: "100%",
                maxWidth: "500px",
                aspectRatio: "1/1",
              }}
            >
              {/* Puzzle grid */}
              <div
                className="grid gap-1 w-full h-full"
                style={{
                  gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                  gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                }}
              >
                {grid.map((tile, index) => (
                  <motion.div
                    key={tile.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.01 }}
                    onClick={() => handleTileClick(index)}
                    onMouseEnter={playHoverSound}
                    className={`relative rounded-md overflow-hidden ${
                      tile.id === 0 ? "invisible" : "cursor-pointer hover:brightness-110"
                    } ${completed ? "border-2 border-green-500" : ""}`}
                    whileHover={tile.id !== 0 && !completed ? { scale: 0.98 } : {}}
                    whileTap={tile.id !== 0 && !completed ? { scale: 0.95 } : {}}
                  >
                    {tile.id !== 0 && (
                      <>
                        {/* Tile image */}
                        <div className="absolute inset-0 bg-black/20">
                          <div
                            className="w-full h-full"
                            style={{
                              backgroundImage: `url(${currentPuzzle.image || currentPuzzle.fallbackImage})`,
                              backgroundSize: `${gridSize * 100}%`,
                              backgroundPosition: `${(tile.correctPos % gridSize) * (100 / (gridSize - 1))}% ${Math.floor(tile.correctPos / gridSize) * (100 / (gridSize - 1))}%`,
                            }}
                          />
                        </div>

                        {/* Tile number (optional, can be removed for more challenge) */}
                        <div className="absolute bottom-1 right-1 bg-black/50 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                          {tile.id}
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Completion overlay */}
              <AnimatePresence>
                {completed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg"
                  >
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15 }}
                      className="bg-black/80 p-6 rounded-xl max-w-md text-center"
                    >
                      <CheckCircleIcon size={50} className="text-green-500 mx-auto mb-4" />
                      <h4 className="text-xl font-bold mb-2">Puzzle Completed!</h4>
                      <p className="mb-4">You've successfully completed the puzzle!</p>
                      <p className="text-gray-300 mb-6">
                        Time: {timeTaken} | Moves: {moves}
                      </p>
                      <div className="flex flex-wrap justify-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-primary text-white px-4 py-2 rounded-lg"
                          onClick={() => {
                            playClickSound()
                            resetPuzzle()
                          }}
                        >
                          Play Again
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-white/10 text-white px-4 py-2 rounded-lg"
                          onClick={() => {
                            playClickSound()
                            setDifficulty(difficulty === "hard" ? "easy" : difficulty === "medium" ? "hard" : "medium")
                          }}
                        >
                          Try {difficulty === "hard" ? "Easy" : difficulty === "medium" ? "Hard" : "Medium"} Mode
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

