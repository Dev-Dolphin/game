import { useEffect, useRef, useState } from 'react'
import Matter, { Body, Common, Composite, Engine, Mouse, MouseConstraint, Render } from 'matter-js'

const BALLS_COUNT = 65
const BALL_RADIUS = 10
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600

function GameMain2 ({onMatterFunctionCall}) {
  const scene = useRef()
  const isPressed = useRef(false)
  const event = useRef(false)
  const renderRef = useRef(false)

  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Runner = Matter.Runner,
      Events = Matter.Events,
      Composite = Matter.Composite
    const engine = Engine.create(),
          world = engine.world;
    event.current = engine;
    
    const render = Render.create({
      element: scene.current,
      // canvas: canvasRef.current,
      engine: engine,
      options: {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        background: 'red',
        wireframes: false,
      }
    })
    renderRef.current = render

    const balls = []
    const ballImagePaths = [
      '/1.png',
    ]

    const createBall = () => {
      const ball = Bodies.circle(
        render.canvas.width / 2 - BALL_RADIUS,
        render.canvas.height / 2 - 2 * BALL_RADIUS,
        BALL_RADIUS, {
          restitution: 1.03,
          render: {
            sprite: {
              texture: ballImagePaths[Math.round(Math.random() * (ballImagePaths.length - 1))]
            }
          }
        })
      balls.push(ball)
      return ball
    }
    Composite.add(world, [
      Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
      Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
      Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
  ]);


    for (let i = 0; i < BALLS_COUNT; i++) {
      World.add(engine.world, createBall())
    }
      // const shakeScene = (engine) =>  {
      //   var timeScale = (1000 / 60) / engine.current.timing.lastDelta;
      //   console.log("timeScale", timeScale)
      //   var bodies = Composite.allBodies(engine.current.world);
  
      //   for (var i = 0; i < bodies.length; i++) {
      //       var body = bodies[i];
  
      //       if (!body.isStatic && body.position.y >= 500) {
      //           // scale force for mass and time applied
      //           var forceMagnitude = (0.035 * body.mass) * timeScale;
  
      //           // apply the force over a single update
      //           Body.applyForce(body, body.position, { 
      //               x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]), 
      //               y: -forceMagnitude + Common.random() * -forceMagnitude
      //           });
      //       }
      //   }
      // }
    // Run the engine
    Engine.run(engine)
    Render.run(render)
    // Build the circle bounds - END
    // Start the blowing with X seconds delay
  
  }, [])
  const handleRunClick = (a) => {
        var timeScale = 1;
        var bodies = Composite.allBodies(event.current.world);
  
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];
  
            if (!body.isStatic && body.position.y >= 500) {
                // scale force for mass and time applied
                var forceMagnitude = (0.055 * body.mass) * timeScale;
  
                // apply the force over a single update
                Body.applyForce(body, body.position, { 
                    x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([2, -2]), 
                    y: -forceMagnitude + Common.random() * -forceMagnitude
                });
            }
    }
};
  return (
    <div

    >
      <div ref={scene} style={{ width: '100%', height: '100%' }} >
      </div>
      <button onClick={handleRunClick}>{isRunning ? 'Pause' : 'Run'}</button>    </div>
  )
}

export default GameMain2