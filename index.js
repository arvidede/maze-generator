if (module.hot) {
    module.hot.accept(function () {
        window.location.reload();
    })
}

import Sketch from './assets/js/sketch';

new p5(Sketch);
