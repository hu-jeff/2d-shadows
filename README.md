# 2D shadows with React.js

This project showcases how it is possible to create 2D shadows off of boxes by treating the mouse as a light source.

Link:

## How I made it

My first difficulty was discovering how to check which corners the shadows would be casted from.

<img width="399" alt="image" src="https://user-images.githubusercontent.com/59699807/208303728-7ce80e1a-9c9c-485f-8024-5542c23a0ec2.png">

With this, I figured I could take the vector from the mouse to the corners of a box and find the largest angle, then, I would have found the two corners the shadows should be casted on.

However, to make this project extensible to other shapes, this only works for rectangular objects.

So, I realized I could check the unit vectors on a point that are normal to a surface connected to a point. If I compare the angles of the normal vectors to the mouse vector, I am able to determine whether that should have a shadow casted.

<img width="420" alt="image" src="https://user-images.githubusercontent.com/59699807/208303983-028a2812-1e21-4610-aaca-2470c487323e.png">

As shown here,

![corners](https://user-images.githubusercontent.com/59699807/208304424-7e19023d-4d98-464a-9273-12e0f40921dc.gif)
