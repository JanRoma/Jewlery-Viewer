<div id="progress"></div>

<style>
#progress {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -3em;
  margin-left: -3em;
  width: 6em;
  height: 6em;
  background-color: transparent;
  text-align: center;
  padding: 10px;
  visibility: visible;
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #3498db; /* Blue */
  border-radius: 50%;
  animation: spin 0.5s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>