1. Let's use proto #1 as the base for the home page as it addresses the goals better. We can and will refine & tweak it later.
2. Design a Single chat interaction option. In option 1, as we discussed, each agent had its own chat space. For example, if the user wanted to work on the website, they would be directed to the chat of the website builder agent. Whereas if the user wanted to get analytics, they would be taken to the chat of the analytics agent.  We want a single chat, which means that the following challenges need to be solved:
    1. User click on the Website agent, they are greeted by the website builder agent. After a few interactions about the website, the user then asked a question about analytics. What happens?
        1. User stays in the same chat and see "Let me bring in XXX, the analytics Agent" ???  and then the agent starts answering?
        2. What happens to the context?  is it reset? will the previous conversation about the website be closed and appears as it's own item in the chat history?
        3. Will there be a visual hint on the chat to show that it is now a different context?
        4. What happens to the canvas or UX around the chat? For example, during the website chat, there could be the website preview displayed in the canvas. Now user asked about analytics... does the canvas changed? to what?
    2. User asked an agent to perform an action that will take ~10 mins to perform. Please design the experience.
        1. What does the user see in the chat?  "This will take some time, i will let you know when done"??
        2. Where will the progress, and result be displayed
    3. It's super important to make sure we go over all details related to context switching and history to be 100% sure we nailed it


3. Once we agree on Home Page and Interaction Design, then we can deep dive and address the "canvas" and "UX context around the chat"
4. And let's leave the event switcher alone for now....We'll address after.