(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "id",
            alias: "Id",
            dataType: tableau.dataTypeEnum.string
        }
        
        ];

        var tableSchema = {
            id: "CovidStatewise",
            alias: "India Covid Statewise Details",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {

     /*   $.ajaxSetup({
         headers : {
            'x-rapidapi-host' : 'api-nba-v1.p.rapidapi.com',
            'x-rapidapi-key' : 'd18cdeb3a2mshab6824adf713c9ep130fb2jsncca2d444588d'
          } 
        }); */

        $.getJSON("", function(resp) {
            var feat = resp.hits.hits,
                tableData = [];
            
            // Iterate over the JSON object
             for (var j = 0, len = feat.length; j < len; j++) { 
                    tableData.push({
                    
                        "id" : feat[j]._id
                        
                    });
            } 
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Covid 19 India Dataset"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
