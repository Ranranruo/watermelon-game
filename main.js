import { FRUITS } from './fruits.js'; 

// 모듈 불러오기
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World = Matter.World,
    Body = Matter.Body;

// 엔진 선언
const engine = Engine.create();

// 렌더 선언(배경)
const render = Render.create({
    engine,
    element: document.body,
    options: {
        wireframes: false,  // true 배경색이 적용이 안됩니다.
        background: '#F7F4C8',
        width: 565,
        height: 850,
    }
});

// 벽 배치를 위한 world 선언
const world = engine.world;

// 왼쪽 벽 생성
const leftWall = Bodies.rectangle(15, 395, 30, 790, {
    isStatic: true,    // 고정해 주는 기능
    render: { fillStyle: '#E6B143'} // 색상 지
})

// 오른쪽 벽 생성
const rightWall = Bodies.rectangle(550, 395, 30, 790, {
    isStatic: true,    // 고정해 주는 기능
    render: { fillStyle: '#E6B143'} // 색상 지
})

// 바닥 생성
const gorund = Bodies.rectangle(280, 820, 570, 60, {
    isStatic: true,    // 고정해 주는 기능
    render: { fillStyle: '#E6B143'} // 색상 지
})

// 종료 라인 생성
const topLine = Bodies.rectangle(310, 150, 620, 2, {
    isStatic: true,    // 고정해 주는 기능
    isSensor : true, // 물리는 적용 안하지만 충돌은 감지
    render: { fillStyle: '#E6B143'} // 색상 지
})

World.add(world, [leftWall, rightWall, gorund, topLine])

Render.run(render);
Runner.run(engine);

let currentBody = null;
let currentFruit = null;
// 조작을 제어하는 변수
let disableAction = false;


// 과일 떨어지는 함수 선언
function addFruit() {

    const index = Math.floor(Math.random()*5);
    const fruit = FRUITS[index];

    const body = Bodies.circle(300, 15, fruit.radius, {
        index : index,
        isSleeping : true,
        render : {
            sprite : {texture : `${fruit.name}.png`},
        },
        // 통통 튕기는 물리 엔진 변수 추가
        restitution : 0.2,
    })

    currentBody = body;
    currentFruit = fruit;

    World.add(world, body)

}
window.addEventListener("keydown", (e) => {
    if(disableAction)
        return;
    switch(e.code){
        case "KeyA":
            // 왼쪽으로 이동
            Body.setPosition(currentBody, {
                x: currentBody.position.x - 10,
                y: currentBody.position.y,
            });
            break;
        case "KeyD":
            Body.setPosition(currentBody, {
                x: currentBody.position.x + 10,
                y: currentBody.position.y,
            });
            break;
        case "KeyS":
            currentBody.isSleeping = false;
            disableAction = true;
            setTimeout(()=>{
                addFruit();
                disableAction = false;
            },1000);
            break;
    }
});

// 과일 떨어지는 함수 사용
addFruit();