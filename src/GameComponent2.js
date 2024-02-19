import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import './App.css'
import { IonPhaser } from '@ion-phaser/react';
const GameComponent2 = () => {
    const gameRef = useRef(null);

    useEffect(() => {
        const gameContainer = document.getElementById('game-container');

        const config = {
            type: Phaser.AUTO,
            parent: 'game-container',
            width: gameContainer.offsetWidth,
            height: gameContainer.offsetHeight,
            backgroundColor: '#3498db',
            physics: {
                default: 'matter',
                matter: {
                    gravity: { y: 0 },
                    debug: false,
                },
            },
            scene: {
                preload: preload,
                create: create,
                update: update,
            },
        };

        const game = new Phaser.Game(config);
        var balls;
        var luckyBall;
        var funnel;
        var ballContainer;

        function preload() {
            this.load.image('ball', '1.png');
            this.load.image('pheu', 'pheu.png')
        }

        function create() {

            balls = [];
            // Tạo nhiều quả bóng
            for (let i = 0; i < 10; i++) {
                const ball = this.matter?.add.image(Phaser.Math.Between(100, 100), 300, 'ball');
                ball?.setCircle();
                ball?.setFriction(0.2);
                ball?.setBounce(0.8);
                balls?.push(ball);
            }
        console.log('balls', balls)
            // Sự kiện thổi khi nhấn nút chuột
            this.input.on('pointerdown', function (pointer) {
                const pointerAngle = Phaser.Math.Angle.BetweenPoints(pointer.position, { x: 400, y: 300 });
                const force = 0.01; // Độ mạnh của lực thổi
        
                balls.children.iterate(function (ball) {
                    const ballAngle = Phaser.Math.Angle.BetweenPoints(ball, pointer.position);
                    const angleDifference = pointerAngle - ballAngle;
                    const distance = Phaser.Math.Distance.Between(ball.x, ball.y, pointer.x, pointer.y);
        
                    // Áp dụng lực dựa trên góc và khoảng cách
                    ball.applyForce({
                        x: force * Math.cos(angleDifference) * distance,
                        y: force * Math.sin(angleDifference) * distance
                    });
                });
            });
        
        }
      
        function hitFunnel() {
            console.log('chay')
            game.pause()
        }
        function update() {
            // Add any additional update logic here
        }
        gameRef.current = game
        // gameRef.current.moveBalls = moveBalls
        return () => game.destroy(); // Cleanup when component unmounts
    }, []);
    const callPhaserFunction = () => {
        if (gameRef?.current) {
            gameRef?.current?.moveBalls();
            console.log(gameRef)
        }
    }
    return (
        <>
            <div id='game-container'>
            </div>
            <button onClick={callPhaserFunction}>Move Balls</button>
        </>


    );
};

export default GameComponent2;
