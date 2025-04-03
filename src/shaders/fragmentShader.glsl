varying vec2 vUv;
varying float vElevation;
uniform float uColor;



        void main() {
            vec4 c1 = vec4(1.0, 0.6745, 0.9451, 1.0);
            vec4 c2 = vec4(1.0, 0.8118, 0.9686, 1.0);

            vec4 c3 = vec4(1.0, 0.8706, 0.6745, 1.0);
            vec4 c4 = vec4(1.0, 0.9529, 0.8863, 1.0);

            float c = smoothstep(-.14, .14, vElevation);
            vec4 color1 = mix(c1, c2, c);
            vec4 color2 = mix(c3, c4, c);

            vec4 finalColor = mix(color1, color2, uColor);

            gl_FragColor = finalColor;
        }