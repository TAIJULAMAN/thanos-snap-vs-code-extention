# Test file for Python

def calculate_sum(numbers):
    print("Calculating sum...")
    
    # Initialize sum variable
    total = 0
    
    # Loop through numbers
    for num in numbers:
        print(f"Adding {num}")
        total += num
        
    print(f"Total: {total}")
    
    # Return the sum
    return total


# Test function for validation
def validate_email(email):
    print(f"Validating email: {email}")
    
    # Check if email contains @
    if '@' not in email:
        print("Invalid email: missing @")
        return False
        
    # Check if email contains .
    if '.' not in email:
        print("Invalid email: missing .")
        return False
        
    print("Email is valid")
    return True
