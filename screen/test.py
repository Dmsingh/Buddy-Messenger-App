class Node:
     
    def __init__(self, key):
         
        self.data = key
        self.left = None
        self.right = None
 
# Recursive function to insert an key into BST
def insert(root, x):
     
    if (root == None):
        return Node(x)
    if (x < root.data):
        root.left = insert(root.left, x)
    elif (x > root.data):
        root.right = insert(root.right, x)
    return root
 
# Function to find k'th largest element
# in BST. Here count denotes the number
# of nodes processed so far
def kthSmallest(root,i):
     

     
    # Base case
    if (root == None):
        return None
 
    # Search in left subtree
    left = kthSmallest(root.left,i)
 
    # If k'th smallest is found in
    # left subtree, return it
    if (left != None):
       
        return left
         
    # If current element is k'th
    # smallest, return it
    i -= 1

    if (i == 0):
        return root
 
    # Else search in right subtree
    return kthSmallest(root.right,i)
 
# Function to find k'th largest element in BST
def ithSmallest(root,i):
     
    # Maintain index to count number
    # of nodes processed so far
    count = 0
    res = kthSmallest(root,i)
 
    if (res == None):
        print("There are less than k nodes in the BST")
    else:
        print("K-th Smallest Element is ", res.data)
 

if __name__ == '__main__':
     
    root = None
    keys = [ 20, 8, 22, 4, 12, 10, 14 ]
 
    for x in keys:
        root = insert(root, x)
 
    k = 2
    
    printKthSmallest(root,k)
 
