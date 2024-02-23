import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import './App.css'
import { IonPhaser } from '@ion-phaser/react';
const GameComponent3 = () => {
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
                    gravity: { y: 500 },
                    enableSleeping: true,
                    // debug: true,
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

        function preload() {
            this.load.image('ball', '2.png');
            this.load.image('pheu', 'pheu.png')
        }
        let thisfake

        function create() {
            thisfake = this
            balls = this.add.group(); 
            funnel = this.physics.add.staticImage(300, 50, 'pheu');
            funnel.setScale(0.05)
            for (let i = 0; i < 10; i++) {
                let ball = this.physics.add.sprite(100 + i, 100, 'ball');
                // ball.setCircle(60)
                ball.setBounce(0.5);
                ball.setVelocity(Phaser.Math.FloatBetween(-100, 200), Phaser.Math.FloatBetween(-200, 200));
                // ball.setAngularVelocity(Phaser.Math.Between(-100, 100));
                ball.setCollideWorldBounds(true);
                ball.setScale(0.5)
                balls.add(ball);

                // time 
                
            }

            this.physics.world.on('worldbounds', function (body) {
                let ball = body.gameObject;
                if (balls.includes(ball)) {
                    // ball.setGravityY(ball.body.velocity.y * -0.2);
                      ball.setAngularVelocity(Phaser.Math.Between(-100, 100));
                    // ball.setFriction(100,100)
                    // ball.setCollideWorldBounds(false);
                   
                }
            });
            this.physics.add.existing(balls);
            // this.physics.add.overlap(balls, funnel, hitFunnel, null, this);


            // hiệu ứng thôi bóng
            // balls.children.iterate(function (balloon) {
            //     balloon.setInteractive({ draggable: true });
            //     balloon.body.setAllowGravity(true);
            //     balloon.displayWidth = 20; // Đặt chiều rộng mong muốn (ví dụ: 20 pixel)
            //     balloon.displayHeight = 20;
            //     balloon.setBounce(1)
            //     balloon.setCircle(45);
            //     balloon.setVelocity(0, 200).setDamping(true);
            //     // balloon.setFriction(0.005).setBounce(1);
            //     balloon.setCollideWorldBounds(true);
            //     // balloon.setBounce(Phaser.Math.FloatBetween(0.1, 0.4));
            //     balloon.setAngularVelocity(Phaser.Math.Between(-100, 100));
            // })
            // this.physics.add.collider(balls, balls, () => { });

            // this.physics.add.image(400, 100, 'ball').setScale(0.5);



        }
        function moveBalls() {
            balls.children.iterate(function (ball, index) {
                    ball.setCircle(45);
                    ball.body.setAllowGravity(true);
                    ball.setAngularVelocity(Phaser.Math.Between(-100, 100));
                    ball.setBounce(1);
                    ball.setCollideWorldBounds(true);
                    ball.body.setVelocity( Phaser.Math.FloatBetween(-100, 400) * 2, Phaser.Math.FloatBetween(-100, 400) * 4).setDamping(true);
                });
            // thisfake.physics.add.collider(balls, balls, () => { });
            thisfake.physics.add.collider(balls, funnel, () => {  });
            // setTimeout(() => {
            //     game.pause()
            // }, 2000)
        }

        function hitFunnel() {
            console.log('chay')
            game.pause()
        }
        function update() {
           
        }
        gameRef.current = game
        gameRef.current.moveBalls = moveBalls
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

export default GameComponent3;
