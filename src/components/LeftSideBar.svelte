<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/svelte-material-ui@4.0.0/bare.min.css" />
    
    <!-- Material Icons -->
    <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
</svelte:head>

<script>
    import { onMount, getContext } from 'svelte';
    import Button, { Label, Icon } from '@smui/button';
    import 'maplibre-gl/dist/maplibre-gl.css';

    function toggleSidebar() {
        var elem = document.getElementById('left');
        var classes = elem.className.split(' ');
        var collapsed = classes.indexOf('collapsed') !== -1;
        
        var padding = {};
        
        if (collapsed) {
            // Remove the 'collapsed' class from the class list of the element, this sets it back to the expanded state.
            classes.splice(classes.indexOf('collapsed'), 1);
            
            padding['left'] = 300; // In px, matches the width of the sidebars set in .sidebar CSS class
        } else {
            padding['left'] = 0;
            // Add the 'collapsed' class to the class list of the element
            classes.push('collapsed');
        }
        
        // Update the class list on the element
        elem.className = classes.join(' ');
    }

    onMount(async() => {
        toggleSidebar()
    });

  </script>
  
    <div id="left" class="sidebar flex-center left collapsed">
        <div class="sidebar-content rounded-rect flex-center">
            <Button id="fly-button" touch variant="outlined">
                <Label>Give me a city!</Label>
            </Button>
            <!-- Make as typography -->
            <Button>
                <Label>Made with <Icon class="material-icons">favorite</Icon>by Fran Martín</Label>
            </Button>
            <div class="sidebar-toggle rounded-rect left" on:click={toggleSidebar}>
                &rarr;
            </div>
        </div>
    </div>

  <style>
        .rounded-rect {
            background: white;
            border-radius: 10px;
            box-shadow: 0 0 50px -25px black;
        }
        
        .flex-center {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .flex-center.left {
            left: 0px;
        }

        .sidebar-content {
            position: absolute;
            width: 95%;
            height: 95%;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 32px;
            color: gray;
        }
        
        .sidebar-toggle {
            position: absolute;
            width: 1.3em;
            height: 1.3em;
            overflow: visible;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .sidebar-toggle.left {
            right: -1.5em;
        }
        
        .sidebar-toggle:hover {
            color: #0aa1cf;
            cursor: pointer;
        }
        
        .sidebar {
            transition: transform 1s;
            z-index: 1;
            width: 300px;
            height: 100%;
        }
        
        /*
        The sidebar styling has them "expanded" by default, we use CSS transforms to push them offscreen
        The toggleSidebar() function removes this class from the element in order to expand it.
        */
        .left.collapsed {
            transform: translateX(-295px);
        }
  </style>
  