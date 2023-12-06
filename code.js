//const pq = require('@datastructures-js/priority-queue');

function dijkstra(graph, sourceNode, unvisitedNodes = [], distance = []) {
    // Initialize distances, with sourceNode's distance being 0 and all other nodes being infinity
    for(i = 0; i < graph.length; i++)
    {
        if(i != sourceNode)
        {
            distance[i] = [Infinity, i]
        } else
        {
            distance[i] = [0, i]
        }
        unvisitedNodes.push(i)
    }
    processedNodes = 0

    // While there are unprocessed nodes in the graph, continue processing nodes
    while(processedNodes < graph.length)
    {
        // Default value for comparison. Useful as an error code
        //next = [Infinity, -1]
        // Select unmarked node with lowest distance to process
        /*
        for(i = 0; i < graph.length; i++)
        {
            if(visitedNodes[i] == false && distance[i][0] < next[0])
            {
                next = [distance[i][0], i]
            }
        }*/
        unvisitedNodes.sort(function(a,b) {
            return distance[b][0] - distance[a][0]
        })
        nextIndex = unvisitedNodes.pop()
        next = [distance[nextIndex][0], nextIndex]

        // Ensure a node has actually been selected. Was useful as error testing, no longer needed.
        //if(next[1] != -1)
        //{
            // For each edge attached to the current node, check if it results in a shorter distance.
            // If it does, modify the distance accordingly
            for(i = 0; i < graph.length; i++)
            {
                if(graph[next[1]][i] > 0)
                {
                    distance[i][0] = Math.min(distance[i][0], next[0]+graph[next[1]][i])
                }
            }
        //}
        processedNodes++
        //visitedNodes[next[1]] = true   
    }
    // Once all nodes have been processed, the result is the final array. Return the result
    return distance
}