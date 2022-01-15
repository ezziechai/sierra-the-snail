namespace SpriteKind {
    export const UncollectedChemical = SpriteKind.create()
    export const CollectedChemical = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.buttonPink, function (sprite, location) {
    if (heldChemical != null) {
        info.startCountdown(35)
        tiles.placeOnTile(heldChemical, location)
        heldChemical.setImage(img`
            . . . . . f . . . . . f . . . . 
            . . . . . f . . . . . f . . . . 
            . . . . . f 2 1 1 1 2 f . . . . 
            . . . . . f 2 1 1 1 2 f . . . . 
            . . . . . f 3 1 1 1 3 f . . . . 
            . . . . . f 3 1 1 1 3 f . . . . 
            . . . . . f 3 1 1 1 3 f . . . . 
            . . . . . f 2 1 1 1 2 f . . . . 
            . . . . . f 2 1 1 1 2 f . . . . 
            . . . . . f 2 1 1 1 3 f . . . . 
            . . . . . f 3 1 1 1 3 f . . . . 
            . . . . . f 3 1 1 1 3 f . . . . 
            . . . . . f 3 1 1 1 3 f . . . . 
            . . . . . f 2 3 1 3 2 f . . . . 
            . . . . . . f 2 2 2 f . . . . . 
            . . . . . . . f f f . . . . . . 
            `)
        heldChemical = null
console.log("dropped chemical")
        info.changeLifeBy(1)
        if (chemicalsLeft == 0) {
            game.showLongText("Thank you for helping me! Now I can turn myself into a human again and go back to the present!", DialogLayout.Bottom)
            game.over(true)
        }
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    sierra.y += -16
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    sierra.x += -16
})
function spawnChemicals (numChemicals: number, startColumn: number, startRow: number, gap: number) {
    for (let index = 0; index <= numChemicals; index++) {
        chemical = sprites.create(img`
            . . . . . f . . . . . f . . . . 
            . . . . . f . . . . . f . . . . 
            . . . . . f 2 1 1 1 2 f . . . . 
            . . . . . f 2 1 1 1 2 f . . . . 
            . . . . . f 3 1 1 1 3 f . . . . 
            . . . . . f 3 1 1 1 3 f . . . . 
            . . . . . f 3 1 1 1 3 f . . . . 
            . . . . . f 2 1 1 1 2 f . . . . 
            . . . . . f 2 1 1 1 2 f . . . . 
            . . . . . f 2 1 1 1 3 f . . . . 
            . . . . . f 3 1 1 1 3 f . . . . 
            . . . . . f 3 1 1 1 3 f . . . . 
            . . . . . f 3 1 1 1 3 f . . . . 
            . . . . . f 2 3 1 3 2 f . . . . 
            . . . . . . f 2 2 2 f . . . . . 
            . . . . . . . f f f . . . . . . 
            `, SpriteKind.UncollectedChemical)
        chemical.z = -1
        tiles.placeOnTile(chemical, tiles.getTileLocation(startColumn, startRow))
        startColumn += 1 + gap
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    sierra.x += 16
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    sierra.y += 16
})
info.onLifeZero(function () {
    game.showLongText("Oh no! I'm totally squashed and I can't get home!", DialogLayout.Bottom)
    game.over(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.fire, 500)
    sprite.sayText("OW!", 500, false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.UncollectedChemical, function (sprite, chemicalSprite) {
    if (heldChemical == null) {
        info.startCountdown(35)
        heldChemical = chemicalSprite
        chemicalSprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        chemicalSprite.setKind(SpriteKind.CollectedChemical)
        chemicalsLeft += -1
        console.log("picked up chemical")
    }
})
let leftCar: Sprite = null
let rightCar: Sprite = null
let startColumn = 0
let chemical: Sprite = null
let sierra: Sprite = null
let chemicalsLeft = 0
let heldChemical: Sprite = null
let crossingTime = 35
chemicalsLeft = 4
tiles.setTilemap(tilemap`level1`)
sierra = sprites.create(img`
    f f e 2 2 2 2 2 2 e e f c . . . 
    f e 2 f f f f f f 2 e f 3 c . . 
    f f f f e e e e f f f f 6 c . . 
    f e f b f 4 4 f b f e f f 3 c . 
    e e 4 1 f d d f 1 4 e e f 3 3 c 
    f e e d d d d d d e e f 3 3 3 c 
    . f e e 4 4 4 4 e e f 3 3 3 c c 
    e 4 f 2 2 2 2 2 2 f 4 e 6 6 c c 
    4 d f 2 2 2 2 2 2 f d 4 3 3 3 c 
    4 4 f 4 4 2 2 4 4 f 4 4 3 3 3 c 
    c 2 2 4 2 2 2 4 b 2 2 c 3 3 c . 
    b 2 4 b 4 4 4 4 b b 2 c b b . . 
    c 4 2 2 b 4 b 2 2 2 4 c 4 2 b . 
    c 2 2 2 c 4 c 2 2 2 c 4 c 2 c . 
    c 2 2 2 2 c 2 2 2 2 c 4 c 2 c . 
    . c c c c c c c c c . . c c c . 
    `, SpriteKind.Player)
tiles.placeOnRandomTile(sierra, sprites.dungeon.collectibleInsignia)
scene.cameraFollowSprite(sierra)
sierra.setFlag(SpriteFlag.StayInScreen, true)
spawnChemicals(chemicalsLeft, 2, 1, 1)
game.showLongText("Hello! I've been turned into a snail and transported to the year 2119 and need your help turning back into a human and getting back to the present. To move me, use the arrow keys. There are five chemicals, but you only need to grab four of them to solve my problems. However, watch out for the timer and the cars! Good luck!", DialogLayout.Full)
info.setLife(15)
info.startCountdown(crossingTime)
game.onUpdateInterval(randint(250, 1000), function () {
    rightCar = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . 2 2 2 2 2 2 2 2 . . . . 
        . . . 2 4 2 2 2 2 2 2 c 2 . . . 
        . . 2 c 4 2 2 2 2 2 2 c c 2 . . 
        . 2 c c 4 4 4 4 4 4 2 c c 4 2 d 
        . 2 c 2 e e e e e e e b c 4 2 2 
        . 2 2 e b b e b b b e e b 4 2 2 
        . 2 e b b b e b b b b e 2 2 2 2 
        . e e 2 2 2 e 2 2 2 2 2 e 2 2 2 
        . e e e e e e f e e e f e 2 d d 
        . e e e e e e f e e f e e e 2 d 
        . e e e e e e f f f e e e e e e 
        . e 9 9 9 9 e e e e 9 9 9 e e e 
        . e 9 9 9 9 9 e e 9 9 9 9 9 e . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    rightCar.vx = 55
    rightCar.setFlag(SpriteFlag.DestroyOnWall, true)
    tiles.placeOnRandomTile(rightCar, assets.tile`myTile`)
    rightCar.x = -20
})
game.onUpdateInterval(randint(250, 1000), function () {
    leftCar = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . 2 2 2 2 2 2 2 2 . . . . 
        . . . 2 c 2 2 2 2 2 2 4 2 . . . 
        . . 2 c c 2 2 2 2 2 2 4 c 2 . . 
        d 2 4 c c 2 4 4 4 4 4 4 c c 2 . 
        2 2 4 c b e e e e e e e 2 c 2 . 
        2 2 4 b e e b b b e b b e 2 2 . 
        2 2 2 2 e b b b b e b b b e 2 . 
        2 2 2 e 2 2 2 2 2 e 2 2 2 e e . 
        d d 2 e f e e e f e e e e e e . 
        d 2 e e e f e e f e e e e e e . 
        e e e e e e f f f e e e e e e . 
        e e e 9 9 9 e e e e 9 9 9 9 e . 
        . e 9 9 9 9 9 e e 9 9 9 9 9 e . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    leftCar.vx = -55
    leftCar.setFlag(SpriteFlag.DestroyOnWall, true)
    tiles.placeOnRandomTile(leftCar, assets.tile`myTile0`)
    leftCar.x = 200
})
game.onUpdateInterval(randint(250, 1000), function () {
    leftCar = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . 2 2 2 2 2 2 2 2 . . . . 
        . . . 2 c 2 2 2 2 2 2 4 2 . . . 
        . . 2 c c 2 2 2 2 2 2 4 c 2 . . 
        d 2 4 c c 2 4 4 4 4 4 4 c c 2 . 
        2 2 4 c b e e e e e e e 2 c 2 . 
        2 2 4 b e e b b b e b b e 2 2 . 
        2 2 2 2 e b b b b e b b b e 2 . 
        2 2 2 e 2 2 2 2 2 e 2 2 2 e e . 
        d d 2 e f e e e f e e e e e e . 
        d 2 e e e f e e f e e e e e e . 
        e e e e e e f f f e e e e e e . 
        e e e 9 9 9 e e e e 9 9 9 9 e . 
        . e 9 9 9 9 9 e e 9 9 9 9 9 e . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    leftCar.vx = -55
    leftCar.setFlag(SpriteFlag.DestroyOnWall, true)
    tiles.placeOnRandomTile(leftCar, assets.tile`myTile0`)
    leftCar.x = 200
})
game.onUpdateInterval(randint(250, 1000), function () {
    rightCar = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . 2 2 2 2 2 2 2 2 . . . . 
        . . . 2 4 2 2 2 2 2 2 c 2 . . . 
        . . 2 c 4 2 2 2 2 2 2 c c 2 . . 
        . 2 c c 4 4 4 4 4 4 2 c c 4 2 d 
        . 2 c 2 e e e e e e e b c 4 2 2 
        . 2 2 e b b e b b b e e b 4 2 2 
        . 2 e b b b e b b b b e 2 2 2 2 
        . e e 2 2 2 e 2 2 2 2 2 e 2 2 2 
        . e e e e e e f e e e f e 2 d d 
        . e e e e e e f e e f e e e 2 d 
        . e e e e e e f f f e e e e e e 
        . e 9 9 9 9 e e e e 9 9 9 e e e 
        . e 9 9 9 9 9 e e 9 9 9 9 9 e . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    rightCar.vx = 55
    rightCar.setFlag(SpriteFlag.DestroyOnWall, true)
    tiles.placeOnRandomTile(rightCar, assets.tile`myTile`)
    rightCar.x = -20
})
forever(function () {
    music.playMelody("C A B C5 A F E C ", 120)
})
