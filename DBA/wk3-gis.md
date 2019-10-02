# QGIS



Installation of QGIS on MacOS

- https://www.qgis.org/en/site/forusers/download.html

Tips on usage

- If you got lost in the map
  - View > Zoom Full (or ⌘⇧F)

Why QGIS is chosen

- Able to import and display point-related data
- Allows import of data in a simple text file with lat and long.



**Geographical decisions**

- Point decisions
  - Where should we locate our distribution centers? 
  - How many are needed to cover the population?
  - Where should we build cell phone towers?
  - Where should we build fire stations?
- Line decisions
  - What route should we follow to get from A to B? 
  - Where should we build our next road? What roads should we widen?

- Area Decisions
  - How should we divide up the country into sales regions?
  - **How should we define the boundaries of voting districts?**



**Layers and Features**

- A **feature** is described by a geometry (point, line segment, polygon)
- Geometries are described using latitude and longitude 
- Each feature is referenced by a unique index, the ‘feature id’ 
- Each feature has a row in a database table, indexed by the feature id 
- The fields (columns) of the table are called **attributes** 
- A **layer** is a collection of features with the same geometry type (point, line, or polygon) 
  - Every feature on a layer has the same set of attributes



**Examples of geometries**

- point attributes: city name, population, elevation above sea level

- line segment attributes: highway number, length, travel time, date completed

- polygon attributes: state name, population, state flower

Polygon layer should be at the bottom, so that it will not cover the line or point layer.



**Case Study Mammoth Motors**

> We recommended a different supply chain design to MM 
> - Current design: one Parts Distribution Center (PDC) in Atlanta served dealers in all southeastern states with weekly deliveries 
> - Proposed target: provide dealers with capability of completing 95% of electromechanical repairs in one day (a dramatic increase in customer service) 
> - Proposed design: 80% of dealers located within four hours of a small satellite distribution center 

Outliers might need to be excluded to make your story clearer, for example there is a dealer with a large number of sales - it might an exporter to other countries.