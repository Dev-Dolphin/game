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
                    enableSleeping: true
                }
            },
            scene: {
                preload: preload,
                create: create,
                update: update,
            },
        };

        const game = new Phaser.Game(config);
        var balls = [];
        var luckyBall;
        var funnel;
        var ballContainer;

        function preload() {
            this.load.image('ball', '1.png');
        }

        function create() {

            // balls = this.physics?.add.group();

            // // Create multiple balls and add them to the group
            // for (var i = 0; i < 5; i++) {
            //     // var ball = this.physics?.add.image(20 + i * 20 , 100, 'ball').setDamping(true);
            //     var ball = this.physics?.add.image(20 + i * 100 , 100, 'ball').setDamping(true);
            //     ball?.setBounce(1);
            //     ball.setVelocity(Phaser.Math.Between(-200, 200), 300);
            //     ball?.setAcceleration(0, 100);
            //     // ball?.setVelocity(1, 100);
            //     balls?.add(ball); // Add each ball to the group
            //     ball?.setCollideWorldBounds(true);

            // }

            // // Handle collisions within the group
            // this.physics?.add.collider(balls, this.physics?.world.bounds, function (ball) {
            //     // console.log('chay vao')

            //     // ball?.setVelocity(123, 0);
            //     // ball?.setAcceleration(0, 0);
            //     // ball?.setBounce(0);
            // });
            this.matter.world.setBounds(0, 0, 500, 800, 32, true, true, false, true);

            //  Add in a stack of balls

            for (let i = 0; i < 64; i++)
            {
                const ball = this.matter.add.image(Phaser.Math.Between(100, 700), Phaser.Math.Between(-800, 0), 'ball');
                ball.setCircle();
                ball.setFriction(0.005);
                ball.setBounce(1);
                balls.push(ball)
            }

        }
        function update() {
            // Add any additional update logic here
        }

        function moveBalls() {
            balls.forEach(ball => {
                console.log('ball.position', ball.position)
                // if (ball.position.y < 120) {
                //     this.matter.body.applyForce(ball, { x: ball.position.x, y: ball.position.y }, { x: -0.003, y: 0.003 })
                // }
        
                // if (ball.position.x < 80) {
                //     this.matter.body.applyForce(ball, { x: ball.position.x, y: ball.position.y }, { x: 0.003, y: -0.003 })
                // }
        
              })
        }

        gameRef.current = game
        gameRef.current.moveBalls = moveBalls
        // gameRef.current.moveBalls = moveBalls
        return () => game.destroy(); // Cleanup when component unmounts
    }, []);
    function callPhaserFunction() {
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
