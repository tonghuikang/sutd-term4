# List processing

Your simulation is useless if it cannot run.



In a discrete event simulation - manage a queue of events
- Remove the first event for processing 
- Insert new events into the queue at the correct location 
  - Maintain the time-sorted sequence 
- Remove arbitrary events as needed 
  - You may want to cancel events that are no longer relevant (cancel a job completion if the machine breaks down)



Insertion into a array is relatively slow.

Python append to end takes O(1) time. Appending to any other part of the array takes O(N) time.



**Task - manage a time-sorted array.**

What do you need to a sorted array?

- Adding to the start of the sorted array.
- Adding to the end of the sorted array.
- Deleting from the start of the sorted array.
- Deleting from the end of the sorted array.
- Adding into the array, while maintaining the sorted array.
- Deleting an element based on its value (e.g. the next largest of a given value).
- Deleting an element based on its position. (e.g. 10th element)





**Singly-Linked Lists**

- Maintaining a sorted singly-linked list is as simple as 
  1. Searching for the point at which to insert the new element (you have to do this anyway) 
  2. Updating at most two pointers
    - In some cases, you may have to update FirstEvent. 
    - There is no need to make a new copy of the array so this will be very fast 
- Removing an event from the sequence is also easy





**A Doubly Linked List** 

- Sometimes, it is faster to start from the end of the list to find an insertion point



(don't you still need to iterate from either end to insert element?)