## Discrete Event Simulation

"Discrete event simulation is a flexible way to describe a system’s behavior. The structure of a simulation model can be described with an event graph."


- The system is described by a **state**.
- The state changes only at discrete points in time, called **events**.
- The interval between events is called a **delay**, or duration. The delay could be random.
- Events can **trigger** other events depending on **conditions** that depend on the state.



The **advantage** of modelling a problem with discrete event simulation

- It models complex behavior with simple language of "states", "events", "delays", "conditions", and "triggers"

- It can jump in time from one event to another. 
  - Nothing ‘interesting’ happens between events: no change in state. 
  - This allows it to rapidly simulate days/weeks/years of real-time activity.

-  If the state is simple (e.g. inventory counts) then processing time and memory required are very small.

In my language, one event is one line in the excel file. You do not need to simulate for every point in time which is computationally intensive and deviates from the simulated mathematical solution.



These are some questions that are asked in the **exam**.

- What is the state of the system?
- At what points in time (events) does the state change?
- What are the delays?
- What events could trigger other events?
- What are the conditions under which events are triggered?



