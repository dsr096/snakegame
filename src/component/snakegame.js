// App.js
import React, { useState, useEffect } from "react";
import "./snakegame.css";

const SnakeGame = () => {
  const [food, setFood] = useState({ x: 10, y: 10 }); // Food initialized at a fixed position
  const [head, setHead] = useState({ x: 12, y: 12 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [snakeBody, setSnakeBody] = useState([{ x: 12, y: 12 }]);
  const [score, setScore] = useState(0);

  const generateFood = () => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * 25) + 1,
        y: Math.floor(Math.random() * 25) + 1,
      };
    } while (
      snakeBody.some((segment) => segment.x === newFood.x && segment.y === newFood.y)
    );

    setFood(newFood);
  };

  const gameOver = () => {
    setHead({ x: 12, y: 12 });
    setVelocity({ x: 0, y: 0 });
    setSnakeBody([{ x: 12, y: 12 }]);
    setScore(0);
    generateFood();
    alert("Game Over");
  };

  const renderGame = () => {
    const newHead = { x: head.x + velocity.x, y: head.y + velocity.y };

    if (
      newHead.x <= 0 ||
      newHead.y <= 0 ||
      newHead.x > 25 ||
      newHead.y > 25 ||
      snakeBody.some((segment, index) => index > 0 && segment.x === newHead.x && segment.y === newHead.y)
    ) {
      gameOver();
      return;
    }

    const newSnakeBody = [...snakeBody];
    newSnakeBody.unshift(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
      setScore(score + 10);
      generateFood();
    } else {
      newSnakeBody.pop();
    }

    setHead(newHead);
    setSnakeBody(newSnakeBody);
  };

  useEffect(() => {
    const interval = setInterval(renderGame, 150);
    return () => clearInterval(interval);
  }, [head, velocity]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const { key } = e;
      if (key === "ArrowUp" && velocity.y !== 1) {
        setVelocity({ x: 0, y: -1 });
      } else if (key === "ArrowDown" && velocity.y !== -1) {
        setVelocity({ x: 0, y: 1 });
      } else if (key === "ArrowLeft" && velocity.x !== 1) {
        setVelocity({ x: -1, y: 0 });
      } else if (key === "ArrowRight" && velocity.x !== -1) {
        setVelocity({ x: 1, y: 0 });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [velocity]);

  return (
    <div className="container">
      <div className="score-container">Score: {score}</div>
      <div className="game-container">
        <div
          className="food"
          style={{ gridArea: `${food.y} / ${food.x}` }}
        ></div>
        {snakeBody.map((segment, index) => (
          <div
            key={index}
            className="snake"
            style={{ gridArea: `${segment.y} / ${segment.x}` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SnakeGame;
