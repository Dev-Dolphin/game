// MatterWorld.js
import React, { useEffect, useRef } from 'react';
import { Engine, Render, World, Bodies } from 'matter-js';

const MatterJs = () => {
    const worldRef = useRef(null);

    useEffect(() => {
      const engine = Engine.create();
      const render = Render.create({
        element: worldRef.current,
        engine: engine,
      });
  
      // Tạo quả bóng nảy
      const ball = Bodies.circle(0, 0, 20, { restitution: 0.8 });
      const staticImage = Bodies.rectangle(0, 0, 200, 200, {
        isStatic: true,
        render: {
          sprite: {
            texture: '2.png',
          },
        },
      });
  
  
  
      // Thêm quả bóng vào thế giới
      World.add(engine.world, [ball, staticImage]);
  
      Engine.run(engine);
      Render.run(render);
  
      // Thêm sự kiện click để làm cho quả bóng nhảy lên
      worldRef.current.addEventListener('click', () => {
        ball.force = { x: 0, y: -0.05 };
      });
  
      return () => {
        // Clean up engine and renderer on component unmount
        Render.stop(render);
        World.clear(engine.world);
        Engine.clear(engine);
      };
    }, []);
    return <div ref={worldRef} style={{ width: '400px', height: '400px', border: '1px solid #ccc' }} />;
};

export default MatterJs;
