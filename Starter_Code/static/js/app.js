function optionChanged(selectedId){
    //read json
    d3.json("samples.json").then( data => {
        //create a dropdown search by id
        const eachId= data.names.map(record => parseInt(record));
        //const eachId=getId.map(record => parseInt(record));
        console.log(eachId)
        //empty list with each refresh
        d3.select('#selDataset').html('');
        eachId.forEach(numId => {
            d3.select('#selDataset').append('option').attr('value', numId).text(numId);
        }); 
        console.log(eachId)

    /////HORIZONTAL CHART//////
        //filter for the values for selected id
        const filtered= data.samples.filter(record => record.id === selectedId);
        console.log(filtered);
        //get the top ten with the otu_ids(y) and sample_values(x)
        const xHbar= filtered.map(record => record.sample_values.slice(0,10));
        const yHbar= filtered.map(record => record.otu_ids.slice(0,10));

        //labels for the y axis
        //make an array of string values the OTU ids
        const otuLabels= yHbar[0].map(record => 'OTU'+record);
        console.log(otuLabels)
        
        
        //build the chart with plotly
        const traceHbar ={ 
            x: xHbar[0], 
            y: otuLabels,
            orientation: 'h',
            type: 'bar',
        };
        const layoutHbar= {
            title: 'Top 10 OTU Sample Values'
        };
        Plotly.newPlot('bar', [traceHbar], layoutHbar);

    //////BUBBLE CHART//////////
    // filter for the ids and values and set size and color
    const tst= (filtered.map(record => record.otu_ids))[0]
    console.log(tst);
        const traceBubble = {
            x: (filtered.map(record => record.otu_ids))[0],
            y: (filtered.map(record => record.sample_values))[0],
            text: (filtered.map(record => record.otu_labels))[0],
            mode: 'markers',
            marker: {
                size: (filtered.map(record => record.sample_values))[0],
                color: (filtered.map(record => record.otu_ids))[0],
                colorscale:'rainbow'
            }
        };

        const layoutBubble ={
            height: 600,
            width: 1000,
            title: 'OTU Demographics'
        };

        Plotly.newPlot('bubble', [traceBubble], layoutBubble)

//////DEMOGRAPHIC INFO///////////
        //identify the demographi area chart
        const chart= d3.select('#sample-metadata');
        //const idToSearch= Object.keys(data.metadata).filter(key => key.id === selectedId);
        const idToSearch= data.metadata.filter(record => record.id === parseInt(selectedId));
        //empty list with each refresh
        d3.select('#sample-metadata').html('');
        idToSearch.map(record => {
            for (let [key, value] of Object.entries(record)) {
                const newRow= chart.append('p');
                newRow.append('p').text(`${key}:${value}`);
            }
        });

// ////////BONUS: GAUGE/////////////

//         var data = [
//             {
//             type: "indicator",
//             mode: "gauge+number+delta",
//             value: //wfreq,
//             title: { text: "Speed", font: { size: 24 } },
//             delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
//             gauge: {
//                 axis: { range: [null, 500], tickwidth: 1, tickcolor: "darkblue" },
//                 bar: { color: "darkblue" },
//                 bgcolor: "white",
//                 borderwidth: 2,
//                 bordercolor: "gray",
//                 steps: [
//                 { range: [0, 250], color: "cyan" },
//                 { range: [250, 400], color: "royalblue" }
//                 ],
//                 threshold: {
//                 line: { color: "red", width: 4 },
//                 thickness: 0.75,
//                 value: 490
//                 }
//             }
//             }
//         ];
        
//         var layout = {
//             width: 500,
//             height: 400,
//             margin: { t: 25, r: 25, l: 25, b: 25 },
//             paper_bgcolor: "lavender",
//             font: { color: "darkblue", family: "Arial" }
//         };
        
//         Plotly.newPlot('gauge', data, layout);
    }); 
};
optionChanged('940');

///////ON CHANGE Selector////////////
//d3.select('#selDataset').on('change', searchId);
d3.select('#selDataset').on('change', () => {
    optionChanged(d3.event.target.value)
});


//d3.select('#selDataset').getElementById(searchId);







