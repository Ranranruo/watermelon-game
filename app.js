const Engine = Matter.Engine;
const Render = Matter.Render;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const World = Matter.World;

// 엔진 선언
const engine = Engine.create();

// 렌더 선언(배경)
const render = Render.create({
    engine,
    element: document.body,
    options: {
        wireframes: false, // true 면 배경색이 적용이 안됩니다.
        background: "#F7F4C8",
        width: 565,
        height: 850,
    }
});

// 벽 배치를 위한 world 선언
const world = engine.world;

// 왼쪽 벽 생성
const leftWall = Bodies.rectangle(15, 395, 30, 790, {
    isStatic: true, // 요소를 화면에 고정시킴 false시 중력이 적용됨
    render: {fillStyle: "#E6B143"},
});
// 오른쪽 벽 생성
const rightWall = Bodies.rectangle(550, 395, 30, 790, {
    isStatic: true, // 요소를 화면에 고정시킴 false시 중력이 적용됨
    render: {fillStyle: "#E6B143"},
});
// 바닥
const ground = Bodies.rectangle(280, 820, 620, 60, {
    isStatic: true, // 요소를 화면에 고정시킴 false시 중력이 적용됨
    render: {fillStyle: "#E6B143"},
});
// 종료라인 생성
const deadLine = Bodies.rectangle(310, 150, 620, 2, {
    isStatic: true, // 요소를 화면에 고정시킴 false시 중력이 적용됨
    render: {fillStyle: "#E6B143"},
});
World.add(world, [leftWall, rightWall, ground, deadLine]);

Render.run(render);
Runner.run(engine);