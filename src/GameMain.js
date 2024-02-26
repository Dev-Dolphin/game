import GameComponent from "./GameComponent"
import GameComponent2 from "./GameComponent2"
import GameComponent3 from "./GameComponent3"

const GameMain = () => {
    return (
        <section >
            <div style={{ position: 'relative', 'width': 500, height: 800, background: 'red', display: 'flex', justifyContent: 'flex-start', borderRadius: '25px', flexDirection: 'column' }}>
                {/* <div>
                    <img src='../pngegg.png' width='50px' height='50px' />
                </div> */}
                <div className="tuanvu" style={{ position: 'relative', height: '100%' }}>
                    {/* <GameComponent /> */}
                    <GameComponent3 />
                </div>
            </div>
        </section>
    )
}

export default GameMain 