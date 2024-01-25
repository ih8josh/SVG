class Shape{
    // Defines a class called Shape which has a constructor intializing 'color' and sets the 'color' value.
    
        constructor(){
            this.color=''
        }
        setColor(color){
            this.color=(color);
        }
    }
    // Defines a Circle class that extends Shape and renders an SVG Circle with position, size, and fill color based on the current instance's properties.
    export class Circle extends Shape{
        render(){
            return `<circle cx="150" cy="100" r="80"  fill="${this.color}"/>`
        }
    }
    // Defines a Square class that extends Shape and renders an SVG Square with position, size, and fill color based on the current instance's properties.
    export class Square extends Shape{
        render(){
            return `<rect x="90" y="40" height="120" width="120" fill="${this.color}"/>`
        }
    }
    // Defines a Triangle(Polygon) class that extends Shape and renders an SVG Triangle(Polygon) with position, size, and fill color based on the current instance's properties.
   export class Triangle extends Shape{
        render(){
            //return `<polygon height="100%" width="100%" points="25,75 75,25 25,25" fill="${this.color}">'
            return `<polygon  points="0,200 300,200 150,0" fill="${this.color}"/>`
        }
    };
    
  