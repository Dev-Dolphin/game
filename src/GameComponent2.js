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
                default: 'arcade',
                arcade: {
                    gravity: { y: 100 },
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
        }

        function create() {
            console.log('chay vao', this)

            balls = this.physics?.add.group();

            // Create multiple balls and add them to the group
            for (var i = 0; i < 5; i++) {
                var ball = this.physics?.add.image(100 + i * 150, 100, 'ball').setDamping(true);
                ball?.setCollideWorldBounds(true);
                ball?.setBounce(0.7);
                ball?.setVelocity(1, 100);

                balls?.add(ball); // Add each ball to the group
            }

            // Handle collisions within the group
            this.physics?.add.collider(balls, this.physics?.world.bounds, function (ball) {
                ball?.setVelocity(0, 0);
                ball?.setAcceleration(0, 0);
                ball?.setBounce(0);
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
    return (
        <>
            <div id='game-container'>
            </div>
        </>


    );
};

export default GameComponent2;
