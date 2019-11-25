L2Dwidget.init({
    model: {
        // jsonPath: '/tororo/assets/tororo.model.json',
        // jsonPath: '/izumi/assets/izumi.model.json',
        jsonPath: '/haru/02/assets/haru02.model.json',
    },
    display: {
        superSample: 2,
        width: 100,
        height: 100,
        position: 'left',
        hOffset: 10,
        vOffset: 510,
    },
    mobile: {
        show: true,
        scale: 1,
        motion: true,
    },
    react: {
        opacityDefault: 0.8,
        opacityOnHover: 0.2,
    }
})