function searchId(selectedId){
    //read json
    d3.json("samples.json").then( data => {
        //create a dropdown search by id
        const eachId= Object.values(data.names);
        //empty list with each refresh
        d3.select('#selDataset').html('');
        eachId.forEach(numId => {
            d3.select('#selDataset').append('option').attr('value', numId).text(numId);
        }); 
        //HORIZONTAL CHART
        //filter for the values for selected id
        const filtered= data.samples.filter(record => record.id === selectedId);
        console.log(filtered);
        //create an object with the otu_ids and sample_values
        // resultsBar= {}
        // filtered.otu_ids.forEach((otdId, index) => {
        //     resultsBar[otdId].push(filtered.sample_values[index])});
            //resultsBar[otdId].push(filtered.otu_ids[index]):[resultsBar.push(filtered.sample_values[index]]});
       
        //sort the sample_values in desc order
        //TEST
        //create an object of the two arrays
        //sort the items in the array by descending order
        //return both into a trace 

        // const descValues= filtered.map((record, index) => record.sample_values.sort((larger, smaller) => smaller - larger));
        // yValues= {}
        // record.otu_ids[index]
        const descValues= filtered.map((record, index) => record.sample_values.sort((larger, smaller) => smaller - larger));
        yValues= {}
        record.otu_ids[index]
        const test= filtered.map((record, index) => {
            return yValues.push(record.sample_values.sort((larger, smaller) => 
                smaller - larger) : record.otu_ids[index])});
        

       



        // const descValues= filtered.map(record => record.sample_values.sort((larger, smaller) => smaller - larger));
        // descValues.slice(0,10); 
        //match the otu_ids to the same order of descValues
        
        //get the top ten sample_values for each individual by sort descending
        console.log(descValues);

    //     const trace ={ 
    //         x: xValues, 
    //         y: filtered.otu_ids,
    //         orientation: 'h',
    //         type: 'bar' 

        /////BUBBLE CHART


        //create bubble chart
        // var traceBubble = {
        //     x: filtered.otu_ids,
        //     y: filtered.sample_values,
        //     //text: 
        //     mode: 'markers',
        //     marker: {
        //         size: filtered.sample_values
        //         //color: 
        //     }
        // };
        


        //   var layoutBubble = {
        //     title: 'Marker Size',
        //     showlegend: false,
        //     height: 600,
        //     width: 600
        // };

        // Ploty.newPlot('bubble', [traceBubble],layoutBubble)

        //////DEMOGRAPHIC INFO
        //identify the demographi area chart
        const chart= d3.select('#sample-metadata');
        //const idToSearch= Object.keys(data.metadata).filter(key => key.id === selectedId);
        const idToSearch= data.metadata.filter(record => record.id === parseInt(selectedId));
        idToSearch.map(record => {
            for (let [key, value] of Object.entries(record)) {
                const newRow= chart.append('p');
                newRow.append('p').text(`${key}:${value}`);
            }
        });

    

    

    }); 
};
searchId('940');

//d3.select('#selDataset').on('change', searchId);








//read samples.json file
// function searchId(selectedId){
//     //read json
//     d3.json("samples.json").then( data => {
//         //create a dropdown search by id
//         const eachId= new set (data.map(record => record.names));
//         //empty list with each refresh
//         d3.select('#selDataset').html('');
//         Array.from(eachId).forEach(numId => {
//             d3.select('#selDataset').append('option').attr('value'. item).value(numId);
//         });
//         //show the selected id from dropdown
//         d3.select('#selDataset').node().value = selectedId;

//         ////HORIZONTAL CHART
//         //filter for the values for selected id
//         const filtered= data.samples.filter(record => record.id === selectedId);
//         //get the top ten sample_values for each individual by sort descending
//         const descValues= filtered.sample_values.sort((larger, smaller) => smaller - larger); 
//         //resort y values into yValues array
//         const yValues= []
//         descValues.forEach((value, index) => yValues.push(filtered.otu_ids[index]));
//         //narrow both lists to the first (top) ten values 
//         const xValues= descValues.slice(0, 10);
//         yValues.slice(0, 10); 
//         console.log(yValues)
        

        //find the values for the chart x= sample_values and y= otu_ids 
        // const trace ={ 
        //     x: xValues, 
        //     y: filtered.otu_ids,
        //     orientation: 'h',
        //     type: 'bar' 
        // };

        // const layoout ={
        //     title= `Top Ten OTUs for ${selectedId}`,
        // };

        // //create horizonatal bar chart
        // Plotly.newPlot('bar', [trace], layout);

//     });

// };



//search action for when the dropdwon is activated
// d3.select('#selDataset').on('change', () => {
//     //generate the horizontal bar chart
//     plotHori(d3.event.target.value); 
//     //generate the bubble chart
//     plotBubble(d3.event.target.value); 
//     //generate the information in demographic info chart
//     fillDemo(d3.event.target.value);
// });