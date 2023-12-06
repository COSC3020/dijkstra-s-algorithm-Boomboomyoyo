const fs = require('fs');
const jsc = require('jsverify');

eval(fs.readFileSync('code.js')+'');

//let V = 9;


const test =
    jsc.forall("nat", function(int) {

        // Unit test from the other implementation
        /*
        let graph = [ [ 0, 4, 0, 0, 0, 0, 0, 8, 0 ],
			[ 4, 0, 8, 0, 0, 0, 0, 11, 0 ],
			[ 0, 8, 0, 7, 0, 4, 0, 0, 2 ],
			[ 0, 0, 7, 0, 9, 14, 0, 0, 0],
			[ 0, 0, 0, 9, 0, 10, 0, 0, 0 ],
			[ 0, 0, 4, 14, 10, 0, 2, 0, 0],
			[ 0, 0, 0, 0, 0, 2, 0, 1, 6 ],
			[ 8, 11, 0, 0, 0, 0, 1, 0, 7 ],
			[ 0, 0, 2, 0, 0, 0, 6, 7, 0 ] ]
        console.log(dijkstra2(graph, 0, int))*/

        // Create a connected graph of v nodes, where v is a random integer generated above.
        nodeCount = Math.max(int,1)
        var graph = connectedGraph(nodeCount)
        // Choose a random node in the graph to find a path to
        sourceNode = Math.floor(Math.random()*(nodeCount))
        // Modify the graph from a directional graph with edges of length one to a bidirectional graph
        // with edges of random length
        // Do this by checking for an edge, and then giving it and its correspondant the same random weight
        for(i = 0; i < graph.length; i++)
        {
            for(j = 0; j < graph.length; j++)
            {
                if(graph[i][j] == 1)
                {
                    weight = (Math.floor(Math.random()*9))
                    graph[i][j] = Math.max(weight, 2)
                    graph[j][i] = graph[i][j]
                }
            }
        }
        //console.log(graph)
        // Store the results of each implementation
        results2 = dijkstra2(graph, sourceNode, nodeCount)
        // Quickly map my results to the same format as theirs
        results1 = dijkstra(graph, sourceNode).map(function(elem) {
            return elem[0]
        })
        // If something is going wrong, it will yell at me so I can fix it
        if(JSON.stringify(results1) != JSON.stringify(results2))
        {
            console.log(results2)
            console.log(results1)
            console.log(graph)
        }
        // Now compare the results of my function to a tested function
        return JSON.stringify(results1) == JSON.stringify(results2);
    });
jsc.assert(test, { tests: 100 });


// External Dijkstra's code, used to test mine

// A Javascript program for Dijkstra's single 
// source shortest path algorithm. 
// The program is for adjacency matrix 
// representation of the graph	 
//let V = 9;

// A utility function to find the 
// vertex with minimum distance 
// value, from the set of vertices 
// not yet included in shortest 
// path tree 
function minDistance(dist,sptSet, V)
{
	
	// Initialize min value 
	let min = Number.MAX_VALUE;
	let min_index = -1;
	
	for(let v = 0; v < V; v++)
	{
		if (sptSet[v] == false && dist[v] <= min) 
		{
			min = dist[v];
			min_index = v;
		}
	}
	return min_index;
}

// A utility function to print 
// the constructed distance array 
/*function printSolution(dist)
{
	document.write("Vertex \t\t Distance from Source<br>");
	for(let i = 0; i < V; i++)
	{
		document.write(i + " \t\t " + 
				dist[i] + "<br>");
	}
}*/

// Function that implements Dijkstra's 
// single source shortest path algorithm 
// for a graph represented using adjacency 
// matrix representation 
function dijkstra2(graph, src, V)
{
	let dist = new Array(V);
	let sptSet = new Array(V);
	
	// Initialize all distances as 
	// INFINITE and stpSet[] as false 
	for(let i = 0; i < V; i++)
	{
		dist[i] = Number.MAX_VALUE;
		sptSet[i] = false;
	}
	
	// Distance of source vertex 
	// from itself is always 0 
	dist[src] = 0;
	
	// Find shortest path for all vertices 
	for(let count = 0; count < V - 1; count++)
	{
		
		// Pick the minimum distance vertex 
		// from the set of vertices not yet 
		// processed. u is always equal to 
		// src in first iteration. 
		let u = minDistance(dist, sptSet, V);
		
		// Mark the picked vertex as processed 
		sptSet[u] = true;
		
		// Update dist value of the adjacent 
		// vertices of the picked vertex. 
		for(let v = 0; v < V; v++)
		{
			
			// Update dist[v] only if is not in 
			// sptSet, there is an edge from u 
			// to v, and total weight of path 
			// from src to v through u is smaller 
			// than current value of dist[v] 
			if (!sptSet[v] && graph[u][v] != 0 && 
				dist[u] != Number.MAX_VALUE &&
				dist[u] + graph[u][v] < dist[v])
			{
				dist[v] = dist[u] + graph[u][v];
			}
		}
	}
	
	// Print the constructed distance array
	//printSolution(dist);
    return dist
}

/*// Driver code
let graph = [ [ 0, 4, 0, 0, 0, 0, 0, 8, 0 ],
			[ 4, 0, 8, 0, 0, 0, 0, 11, 0 ],
			[ 0, 8, 0, 7, 0, 4, 0, 0, 2 ],
			[ 0, 0, 7, 0, 9, 14, 0, 0, 0],
			[ 0, 0, 0, 9, 0, 10, 0, 0, 0 ],
			[ 0, 0, 4, 14, 10, 0, 2, 0, 0],
			[ 0, 0, 0, 0, 0, 2, 0, 1, 6 ],
			[ 8, 11, 0, 0, 0, 0, 1, 0, 7 ],
			[ 0, 0, 2, 0, 0, 0, 6, 7, 0 ] ]
dijkstra2(graph, 0);*/

// This code is contributed by rag2127


// Graph generation code, from my wildcard project
function connectedGraph(v)
{
    // Populate an empty adjacency matrix the size of the graph
    graph = []
    for(i=0; i < v; i++)
    {
        graph.push([])
        for(j=0; j < v; j++)
        {
            graph[i].push(0)
        }
    }
    // Pick a random number of edges between the number of nodes minus one (the minimum number of edges
    // for a connected graph) and v^2 edges (the maximum number of edges for a connected graph)
    edges = Math.max(Math.floor(v*(Math.random()*(v))),v-1)
    // Pass to recursive constructor function
    return connectedGraph2(v, edges, graph)
}

function connectedGraph2(v, e, graph, connectedNodes = [0])
{
    // While there are more edges to be placed than unconnected nodes, place edge arbitrarily
    while(e > v-connectedNodes.length)
    {
        // Select a random connected node to generate an edge to another random node
        n1 = randomElementRange(connectedNodes.length)
        n1 = connectedNodes[n1]
        n2 = randomElementRange(v)
        unplaced = true
        while(unplaced)
        {
            // If this is an unplaced edge, place the edge
            if(graph[n1][n2] == 0)
            {
                graph[n1][n2] = 1
                e -=1    
                if(!connectedNodes.includes(n2))
                {
                    connectedNodes.push(n2)
                }
                unplaced = false
            // Else if there are remaining edges in this row that may be placeable, 
            // iterate to the next one
            } else if(n2 < graph[n1].length)
            {
                n2 += 1
            // Else if there is no remaining edges in this row that may be placeable, go to the next row
            } else if(n2 >= graph[n1].length-1)
            {
                if(n1 == graph.length - 1)
                {
                    n1 = 0
                    n2 = 0
                } else
                {
                    n2 = 0
                    n1 += 1
                }
            }
        }

    }
    
    // When there are only enough edges to connect each unconnected node, connect unconnected nodes to graph
    if(e > 0)
    {
        for(i = 0; i < v; i++)
        {
            if(!connectedNodes.includes(i))
            {
                n1 = Math.max(Math.floor(Math.random()*(connectedNodes.length))-1,0)
                n1 = connectedNodes[n1]
                graph[n1][i] = 1
                e -= 1
                connectedNodes.push(i)
            }   
        }
    }
    return graph
}

function randomElementRange(n) 
{
    return Math.floor(Math.random()*n)
}