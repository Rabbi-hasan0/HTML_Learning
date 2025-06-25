<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Swirl Click Effect</title>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      background: #fff;
    }
    canvas {
      display: block;
    }
  </style>
</head>
<body>
  <canvas id="canvas"></canvas>
  <script>
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    let particles = [];

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 20 + 10;
        this.angle = Math.random() * 2 * Math.PI;
        this.speed = Math.random() * 2 + 1;
        this.color = `hsla(${Math.random() * 360}, 100%, 80%, 0.3)`;
        this.life = 100;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.radius *= 0.96;
        this.life--;
      }

      draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    canvas.addEventListener("click", (e) => {
      for (let i = 0; i < 20; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
      }
    });

    function animate() {
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles = particles.filter(p => p.life > 0);
      for (let p of particles) {
        p.update();
        p.draw();
      }

      requestAnimationFrame(animate);
    }

    animate();
  </script>
</body>
</html>
