L2Dwidget.init({
    model: {
        jsonPath: '/tororo/assets/tororo.model.json',
    },
    display: {
        superSample: 2,
        width: 100,
        height: 100,
        position: 'left',
        hOffset: 180,
        vOffset: 460,
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