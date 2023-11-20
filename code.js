const pq = require('@datastructures-js/priority-queue');

function dijkstra(graph, sourceNode, visitedNodes = [], distance = []) {
    // Initialize distances, with sourceNode's distance being 0 and all other nodes being infinity
    // At the same time, initialize whether or not a node has been visited
    //if(visitedNodes == [] && distance == [])
    //{
    //distance[sourceNode] = [0, sourceNode]
    //visitedNodes[sourceNode] = true
    for(i = 0; i < graph.length; i++)
    {
        if(i != sourceNode)
        {
            distance[i] = [Infinity, i]
        } else
        {
            distance[i] = [0, i]
        }
        //if(visitedNodes[i] != true)
        //{
        visitedNodes[i] = false
        //}
    }
    //}
    processedNodes = 0
    // Turn my 2 value array into a priority queue which tracks distances
    // distQueue = pq.PriorityQueue.fromArray(unmarked, (a, b) => a[0] - b[0])

    while(processedNodes < graph.length)
    {
        next = [Infinity, -1]
        // Select unmarked node with lowest distance to process
        for(i = 0; i < graph.length; i++)
        {
            if(visitedNodes[i] == false && distance[i][0] < next[0])
            {
                //console.log(distance[i][0])
                next = [distance[i][0], i]
            }
        }
        if(next[1] != -1)
        {
            for(i = 0; i < graph.length; i++)
            {
                if(graph[next[1]][i] > 0)
                {
                    distance[i][0] = Math.min(distance[i][0], next[0]+graph[next[1]][i])
                }
            }
        }
        processedNodes++
        visitedNodes[next[1]] = true   
    }
    return distance
}

//test = [[0, 4, 0, 2, 0],[0, 0, 2, 0, 0],[0, 0, 0, 8, 0],[0, 0, 0, 0, 3],[6, 0, 0, 0, 0]]
//console.log(dijkstra(test, 4))