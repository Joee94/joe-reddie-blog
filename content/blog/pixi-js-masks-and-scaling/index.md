---
title: Using and scaling masks in PIXI.js
date: '2020-10-02'
description: 'A short guide to creating scaled masks in Pixi.js'
---

# Using and scaling masks in PIXI.js

Pixi.js is great for all things WebGL/Canvas, but one pain point I hit recently was with **masks**. In a project at work I was tasked with taking an image, scaling it down, cropping it to a circle, and then applying a border around it. There could be hundreds of these images on screen at any one time and they didn't have to move.

![The original brief](./brief.png)

## The problem

Pretty swiftly I ran into the issue that masks on a WebGL canvas are incredibly slow. Using a tool called [Spector.js](https://spector.babylonjs.com/) I was able to see just how many WebGL commands were being called, and there were roughly 15x more commands when using a mask on each image.

## Further teething issues

I knew what the solution was, I had to generate a bitmap from the masked image, the issue was that I had to scale the image- and I could not expect the provided images to be the correct size.
The standard procedure for adding a mask is to take some graphic, add it as a child to a sprite, and then set the mask of the sprite to the graphic.

    const graphics = new PIXI.Graphics();
    graphics.lineStyle(0);
    graphics.beginFill(0xffffff, 1);
    graphics.drawCircle(0, 0, 50);
    graphics.endFill();

    const sprite = new PIXI.Sprite('some sprite');
    sprite.width = 100;
    sprite.height = 100;
    sprite.addChild(graphics);
    sprite.mask = graphics;
    sprite.texture = renderer.generateTexture(sprite)

The issue here? We've resized the sprite, and therefore whatever we add as a child will assume the same scale multiplier. We could be clever and work out what the scale multiplier was and scale the child image up by that amount but that feels... messy.

## A simple fix

The solution is quite simply to draw the mask to the size of the **original unscaled image**

    const graphics = new PIXI.Graphics();
    graphics.lineStyle(0);
    graphics.beginFill(0xffffff, 1);
    graphics.drawCircle(0, 0, imageOriginalWidth / 2);
    graphics.endFill();

    const sprite = new PIXI.Sprite('some sprite');
    sprite.mask = mask;
    sprite.addChild(mask);
    sprite.width = 100;
    sprite.height = 100;
    sprite.texture = renderer.generateTexture(sprite);

    sprite.mask = undefined;
    mask.destroy();

And don't forget to destroy the original mask.

## Was that it?

Writing this blog post and looking back... it's simple, it's so simple. Was it worth writing a blog post over? Perhaps not but hopefully this pops up in someones google search and saves them some hassle.

Making this small change got the number of WebGL commands from around 1100 to about 100, which is a substantial difference and instantly noticeable to those who had previously tried it.
