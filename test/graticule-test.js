var api = require('../'),
    assert = require('assert');

describe('mapshaper-graticule.js', function () {

  it('create latlong graticule if no data has been loaded', function(done) {

    api.runCommands('-graticule', function(err, dataset) {
      assert.equal(dataset.layers[0].name, 'graticule');
      assert(api.internal.getDatasetProjection(dataset).is_latlong);
      done();
    });
  });

  it('reproject to match dataset with known projection', function(done) {

    api.runCommands('-i test/test_data/three_points.shp -proj +proj=robin -graticule', function(err, dataset) {
      var graticule = dataset.layers[1];
      var bbox = api.internal.getLayerBounds(graticule, dataset.arcs);
      assert.equal(graticule.name, 'graticule');
      assert(!api.internal.probablyDecimalDegreeBounds(bbox));
      done();
    });
  })

});
