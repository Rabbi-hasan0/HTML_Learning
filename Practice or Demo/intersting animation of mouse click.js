<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Mouse & Click Swirl</title>
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
      constructor(x, y, isClick = false) {
        this.x = x;
        this.y = y;
        this.radius = isClick ? (Math.random() * 20 + 20) : (Math.random() * 10 + 5);
        this.angle = Math.random() * 2 * Math.PI;
        this.speed = Math.random() * (isClick ? 3 : 1) + 0.5;
        this.color = isClick
          ? `hsla(${Math.random() * 360}, 100%, 60%, 0.6)`
          : `hsla(${Math.random() * 360}, 100%, 80%, 0.15)`;
        this.life = isClick ? 100 : 30;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.radius *= 0.95;
        this.life--;
      }

      draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // swirl follows mouse movement (gentle effect)
    document.addEventListener("mousemove", (e) => {
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
      }
    });

    // bigger effect on click
    document.addEventListener("click", (e) => {
      for (let i = 0; i < 25; i++) {
        particles.push(new Particle(e.clientX, e.clientY, true));
      }
    });

    function animate() {
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
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
