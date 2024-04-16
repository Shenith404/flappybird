let move_speed = 8, gravity = 0.4;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');
let sound_point = new Audio('sounds effect/point.mp3');
let sound_die = new Audio('sounds effect/die.mp3');

// Getting bird element properties
let bird_props = bird.getBoundingClientRect();

// This method returns DOMRect -> top, right, bottom, left, x, y, width, and height
let background = document.querySelector('.background').getBoundingClientRect();

let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let game_state = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

let flag = document.createElement('div');
flag.className = 'flag';
flag.style.position = 'absolute';
flag.style.top = '0%';  // Center vertically
flag.style.left = '50%'; // Center horizontally
flag.style.transform = 'translate(-50%, -50%)'; // Adjust to center the element

document.body.appendChild(flag);

document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter' && game_state != 'Play') {
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        bird.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0';
        flag.innerHTML ='';
        message.classList.remove('messageStyle');
        play();
    }
});

function play() {
    function move() {
        if (game_state != 'Play') return;

        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            if (pipe_sprite_props.right <= 0) {
                element.remove();
            } else {
                if (bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width &&
                    bird_props.left + bird_props.width > pipe_sprite_props.left &&
                    bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height &&
                    bird_props.top + bird_props.height > pipe_sprite_props.top) {
                    game_state = 'End';
                    message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter To Restart';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    sound_die.play();
                    return;
                } else {
                    if (pipe_sprite_props.right < bird_props.left &&
                        pipe_sprite_props.right + move_speed >= bird_props.left &&
                        element.increase_score == '1') {
                        score_val.innerHTML = +score_val.innerHTML + 1;
                        sound_point.play();
                        if(parseInt(score_val.innerHTML)%5===0){
                            move_speed++;
                        }
                    }
                    element.style.left = pipe_sprite_props.left - move_speed + 'px';
                }
            }
        });

        // Check for flag display at score 1
        if (parseInt(score_val.innerHTML) === 10 ) {
            flag.style.top = '50%';
            flag.innerHTML = 'flag1';// Center horizontally
        }  if (parseInt(score_val.innerHTML) === 11 ) {
            flag.style.top = '50%';
            flag.innerHTML = '';// Center horizontally
        }  if (parseInt(score_val.innerHTML) === 20 ) {
            flag.style.top = '50%';
            flag.innerHTML = 'flag2';// Center horizontally
        }  if (parseInt(score_val.innerHTML) === 21 ) {
            flag.style.top = '50%';
            flag.innerHTML = '';// Center horizontally
        }  if (parseInt(score_val.innerHTML) === 30 ) {
            flag.style.top = '50%';
            flag.innerHTML = 'flag3';// Center horizontally
        }

        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let bird_dy = 0;
    function apply_gravity() {
        if (game_state != 'Play') return;
        bird_dy = bird_dy + gravity;
        document.addEventListener('keydown', (e) => {
            if (e.key == 'ArrowUp' || e.key == ' ') {
                img.src = 'images/Bird-2.png';
                bird_dy = -7.6;
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.key == 'ArrowUp' || e.key == ' ') {
                img.src = 'images/Bird.png';
            }
        });

        if (bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
            game_state = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        bird.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipe_separation = 0;
    let pipe_gap = 35;

    function create_pipe() {
        if (game_state != 'Play') return;
    
        if (pipe_separation > 85) {
            pipe_separation = 0;
            var randomWidth = Math.floor(Math.random() * (30 - 5 + 1)) + 5;

    
            let pipe_posi = Math.floor(Math.random() * 43) + 8;
            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
            pipe_sprite_inv.style.left = '100vw';
    
            document.body.appendChild(pipe_sprite_inv);
    
            // Set random width for upper pipe
            pipe_sprite_inv.style.width = randomWidth + 'vw';
    
            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1';
    
            // Set random width for lower pipe
            pipe_sprite.style.width = randomWidth+ 'vw';
    
            document.body.appendChild(pipe_sprite);
        }
        pipe_separation++;
        requestAnimationFrame(create_pipe);
    }
    
    requestAnimationFrame(create_pipe);
}
