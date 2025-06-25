<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Dual Mouse Animation</title>
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
      constructor(x, y, type = "move") {
        this.x = x;
        this.y = y;
        this.type = type;

        if (type === "move") {
          this.radius = Math.random() * 6 + 2;
          this.speed = 0.5;
          this.life = 30;
          this.color = `rgba(100, 150, 255, 0.1)`;
          this.angle = Math.random() * 2 * Math.PI;
        } else if (type === "click") {
          this.radius = Math.random() * 12 + 8;
          this.speed = Math.random() * 3 + 1;
          this.life = 80;
          this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
          this.angle = Math.random() * 2 * Math.PI;
        }
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

    // Mouse move: trailing glow
    document.addEventListener("mousemove", (e) => {
      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(e.clientX, e.clientY, "move"));
      }
    });

    // Mouse click: burst explosion
    document.addEventListener("click", (e) => {
      for (let i = 0; i < 35; i++) {
        particles.push(new Particle(e.clientX, e.clientY, "click"));
      }
    });

    function animate() {
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
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
